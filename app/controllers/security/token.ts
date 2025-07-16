import { ClientType, VendeurType,} from '@/app/Types/Types';
import { CompactEncrypt, compactDecrypt } from 'jose';

import { cookies } from 'next/headers';
import {  NextResponse } from 'next/server';

//Une clé pour la sécurité
const rawSecret = process.env.JWT_SECRET!;
const secretKey = new TextEncoder().encode(rawSecret.padEnd(32).slice(0, 32));

//On genère le token pour 30 jours
export const GenerateToken = async (payload: ClientType | VendeurType) => {

  try {

    //On génère d'abord le token avec jose

    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(payload));

    // Avec une clé symétrique (A256GCMKW)
    const token = await new CompactEncrypt(data)
      .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
      .encrypt(secretKey);

    //On enregistre dans les cookies
      (await cookies()).set({
        name: 'token',
        value: token ?? '',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30, // 30 jours
        path: '/',
      });

  return "ok";

  } catch (error) {
    console.log(error)
  }

};

// Récupérer le token
export const GetAuthToken = async () => {
  const token = (await cookies()).get('token')?.value || "token-vide";

   // Avec une clé symétrique
    const { plaintext: decryptedPayloadSym } = await compactDecrypt(token, secretKey);
    const data = JSON.parse(new TextDecoder().decode(decryptedPayloadSym))

  if (!data) {
    return null
  }
  return { message: "ok", data }
};

// Déconnexion
const LogoutUser = async (req: Request) => {
  (await cookies()).delete('token');
  return NextResponse.redirect(new URL('/', req.url));
};
