import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan());

app.post("/register", async (req, res) => {
  try {
    // Periksa apakah email petugas sudah terdaftar
    const existingLembaga = await prisma.lembaga.findFirst({
      where: { emailPetugas: req.body.emailPetugas },
    });
    if (existingLembaga) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Email Petugas Sudah Terdaftar",
      });
    }

    const generateKodeBooking = Math.floor(100000 + Math.random() * 900000);
    // Simpan data lembaga ke database
    const lembaga = await prisma.lembaga.create({
      data: {
        namaLembaga: req.body.namaLembaga,
        jenjangPendidikan: req.body.jenjangPendidikan,
        alamatLembaga: req.body.alamatLembaga,
        emailPetugas: req.body.emailPetugas,
        namaPetugas: req.body.namaPetugas,
        teleponPetugas: req.body.teleponPetugas,
        statusImplementasi: "menunggu konfirmasi",
        kodeBooking: generateKodeBooking,
      },
    });

    // Kirim email konfirmasi
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: req.body.emailPetugas,
      subject: "Konfirmasi Registrasi: Implementasi Digitalisasi Pesantren",
      html: generateConfirmationEmail(lembaga),
      attachments: [
        {
          filename: "data_santri.xlsx",
          path: "./assets/data_santri.xlsx",
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      status: 200,
      data: lembaga,
      message: "Data Berhasil ditambahkan",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Terjadi kesalahan pada server",
    });
  }
});

// Fungsi untuk menghasilkan isi email konfirmasi
function generateConfirmationEmail(lembaga) {
  return `
    <style>
        h3 {
            font-size: 24px;
            margin-bottom: 16px;
        }
        table {
            border-collapse: collapse;
            width: 100%;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
    <h3>Konfirmasi Registrasi: Implementasi Digitalisasi Pesantren</h3>
    <table>
        <tr>
            <th>Nama Pesantren</th>
            <td>${lembaga.namaLembaga}</td>
        </tr>
        <tr>
            <th>Jenjang Pendidikan</th>
            <td>${lembaga.jenjangPendidikan}</td>
        </tr>
        <tr>
            <th>Alamat</th>
            <td>${lembaga.alamatLembaga}</td>
        </tr>
        <tr>
            <th>Status Implementasi</th>
            <td>${lembaga.statusImplementasi}</td>
        </tr>
        <tr>
            <th>Kode Booking</th>
            <td>${lembaga.kodeBooking}</td>
        </tr>
    </table>
    <p>Silakan lengkapi data santri dengan template yang tersedia pada file yang terlampir (data-santri.xlsx). Mohon dikirimkan kembali dalam format PDF ke alamat email ini.</p>
  `;
}

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
