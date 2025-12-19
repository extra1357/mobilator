export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { successResponse, errorResponse } from '@/utils/api-response';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return errorResponse('Email e senha são obrigatórios', 400);
    }

    // Buscar usuário no banco
    const user = await prisma.usuario.findUnique({
      where: { email },
      select: {
        id: true,
        nome: true,
        email: true,
        senha: true,
        role: true,
        ativo: true
      }
    });

    if (!user) {
      return errorResponse('Credenciais inválidas', 401);
    }

    if (!user.ativo) {
      return errorResponse('Usuário inativo', 403);
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(password, user.senha);

    if (!senhaValida) {
      return errorResponse('Credenciais inválidas', 401);
    }

    // Retornar dados do usuário (sem a senha)
    const { senha, ...userData } = user;

    return successResponse({
      token: `bearer-${user.id}`, // Token simples (pode melhorar com JWT depois)
      user: userData
    }, 'Login realizado com sucesso');

  } catch (error: any) {
    console.error('Erro no login:', error);
    return errorResponse('Erro ao fazer login: ' + error.message, 500);
  } finally {
    await prisma.$disconnect();
  }
}