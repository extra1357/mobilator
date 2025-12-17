import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publico = searchParams.get('publico');

    let imoveis;
    
    if (publico === 'true') {
      // Busca apenas imóveis públicos e ativos
      imoveis = await prisma.imovel.findMany({
        where: {
          status: 'ATIVO',
          disponivel: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    } else {
      // Busca todos os imóveis (para área administrativa)
      imoveis = await prisma.imovel.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      });
    }

    return NextResponse.json(imoveis);
  } catch (error) {
    console.error('Erro ao buscar imóveis:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar imóveis' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const imovel = await prisma.imovel.create({
      data: {
        ...body,
        status: body.status || 'ATIVO',
        disponivel: body.disponivel !== false
      }
    });

    return NextResponse.json(imovel, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar imóvel:', error);
    return NextResponse.json(
      { error: 'Erro ao criar imóvel' },
      { status: 500 }
    );
  }
}