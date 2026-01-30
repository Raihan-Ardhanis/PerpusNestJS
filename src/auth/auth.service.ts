import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // ================= LOGIN =================
  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: { member: true },
    });

    if (!user) {
      throw new UnauthorizedException('Username tidak ditemukan');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Password salah');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      memberId: user.memberId,
    };

    return {
      message: 'Login berhasil',
      access_token: this.jwtService.sign(payload),
    };
  }

  // ============ REGISTER MANUAL ROLE ============
  async registerManual(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (existingUser) {
      throw new UnauthorizedException('Username sudah digunakan');
    }

    // Validasi logika sesuai konsep User vs Member
    if (dto.role === UserRole.MEMBER && !dto.memberId) {
      throw new UnauthorizedException('Role MEMBER wajib memiliki memberId');
    }

    if (dto.role !== UserRole.MEMBER) {
      // ADMIN & PETUGAS tidak boleh punya memberId
      dto.memberId = undefined;
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        password: hashedPassword,
        role: dto.role,      // 🔥 ROLE DARI INPUT
        memberId: dto.memberId,
      },
    });

    return {
      message: 'Register berhasil',
      role: user.role,
      userId: user.id,
    };
  }
}
