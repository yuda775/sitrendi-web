import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

async function sendConfirmationEmail(mailOptions) {
  try {
    await transporter.sendMail(mailOptions);
    console.log("[bookingImplementation] Successfully sent email");
  } catch (error) {
    console.error("[bookingImplementation] Error sending email:", error);
    throw new Error("Gagal mengirim email konfirmasi");
  }
}

async function generateConfirmationEmail(pesantren) {
  return `
    <p>Kepada ${pesantren.user.nama},</p>
    <p>Terima kasih telah mendaftar untuk booking implementasi Sitrendi! Kami sangat menghargai minat dan kepercayaan Anda kepada kami.</p>
    <p>Berikut adalah rincian booking implementasi yang Anda daftarkan:</p>    
    <ul>
        <li>Nama pesantren: ${pesantren.nama}</li>
        <li>Jenjang Pendidikan: ${pesantren.jenjangPendidikan}</li>
        <li>Alamat: ${pesantren.alamat}</li>
        <li>Status Implementasi: ${pesantren.bookings[0].statusImplementasi}</li>
        <li>Kode Booking: ${pesantren.bookings[0].kodeBooking}</li>
    </ul>
    <p>Silakan lengkapi data santri dengan template yang tersedia pada file yang terlampir (data-santri.xlsx). Mohon dikirimkan kembali dalam format PDF ke alamat email ini.</p>
    <p>Kami akan segera memproses permintaan Anda dan menghubungi Anda jika ada informasi tambahan yang perlu disampaikan.</p>
    <p>Jika Anda memiliki pertanyaan lebih lanut atau perlu bantuan, jangan ragu untuk menghubungi tim dukungan kami di support@sitrendi.com atau melalui nomor telepon 123-456-789.</p>
    <p>Terima kasih atas kepercayaan Anda kepada Sitrendi. Kami berharap dapat memberikan pengalaman yang memuaskan dan solusi yang bermanfaat untuk kebutuhan Anda.</p>
  `;
}

export default {
  bookingImplementation: async (req, res) => {
    try {
      console.log("[bookingImplementation] Finding existing pesantren");
      const existingPesantren = await prisma.pesantren.findFirst({
        where: {
          user: {
            email: req.body.emailPetugas,
          },
        },
      });

      if (existingPesantren) {
        console.log("[bookingImplementation] Pesantren already exists");
        return res.status(400).json({
          success: false,
          status: 400,
          message: "Email Petugas Sudah Terdaftar",
        });
      }

      console.log("[bookingImplementation] Creating new pesantren");
      const pesantren = await prisma.pesantren.create({
        data: {
          nama: req.body.namaPesantren,
          jenjangPendidikan: req.body.jenjangPendidikan,
          alamat: req.body.alamatPesantren,
          user: {
            create: {
              nama: req.body.namaPetugas,
              email: req.body.emailPetugas,
              telepon: req.body.teleponPetugas,
              role: "Petugas Pesantren",
            },
          },
          bookings: {
            create: [
              {
                statusImplementasi: "Belum di Implementasi",
                kodeBooking: Math.floor(100000 + Math.random() * 900000),
              },
            ],
          },
        },
        include: {
          bookings: true,
          user: true,
        },
      });
      console.log({ pesantren });
      console.log("[bookingImplementation] Successfully created pesantren");

      // Kirim email konfirmasi
      console.log("[bookingImplementation] Sending email");
      const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: pesantren.user.email,
        subject: "Konfirmasi Registrasi: Implementasi Digitalisasi Pesantren",
        html: await generateConfirmationEmail(pesantren),
        attachments: [
          {
            filename: "data_santri.xlsx",
            path: "./assets/data_santri.xlsx",
          },
        ],
      };
      await sendConfirmationEmail(mailOptions);

      res.status(200).json({
        success: true,
        status: 200,
        data: pesantren,
        message: "Data Berhasil ditambahkan",
      });
    } catch (error) {
      console.error("[bookingImplementation] Error:", error);
      res.status(500).json({
        success: false,
        status: 500,
        message: "Terjadi kesalahan pada server",
      });
      throw new Error(error);
    }
  },

  checkBooking: async (req, res) => {
    try {
      const pesantren = await prisma.pesantren.findFirst({
        where: {
          bookings: {
            some: {
              kodeBooking: parseInt(req.body.kodeBooking),
            },
          },
        },

        include: {
          bookings: {
            select: {
              kodeBooking: true,
              statusImplementasi: true,
            },
          },
        },
      });

      if (!pesantren) {
        return res.json({
          success: false,
          status: 400,
          message: "Kode Booking Tidak Terdaftar",
        });
      }
      return res.status(200).json({
        success: true,
        status: 200,
        data: pesantren,
        message: "Data Berhasil ditemukan",
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};
