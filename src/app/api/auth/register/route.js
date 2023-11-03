import * as argon2 from 'argon2';
import { NextResponse } from 'next/server';
import db from '../../../../libs/prisma';

export async function POST(request) {
  const data = await request.json();

  try {
    const userFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: 'Email already exists',
        },
        {
          status: 400,
        }
      );
    }

    const userFoundUsername = await db.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (userFoundUsername) {
      return NextResponse.json(
        {
          message: 'Username already exists',
        },
        {
          status: 400,
        }
      );
    }

    const hashPaswword = (data.password = await argon2.hash(data.password));

    const newUser = await db.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashPaswword,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.error(error);
  }
}
