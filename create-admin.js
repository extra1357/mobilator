const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const senha = 'admin123'; // MUDE AQUI para a senha que quiser
    const hash = await bcrypt.hash(senha, 10);
    
    const user = await prisma.usuario.upsert({
      where: { email: 'admin@imobiliaria.com' },
      update: { senha: hash },
      create: {
        nome: 'Administrador',
        email: 'admin@imobiliaria.com',
        senha: hash,
        role: 'ADMIN'
      }
    });
    
    console.log('✅ Usuário admin criado/atualizado!');
    console.log('📧 Email:', user.email);
    console.log('🔑 Senha: admin123');
    console.log('');
    console.log('Faça login em: http://localhost:3000/admin/login');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();