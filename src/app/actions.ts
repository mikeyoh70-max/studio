'use server';

// A mock list of verified admin numbers.
const verifiedAdmins = [
  '0895323091263',
  '+62895323091263'
];

export interface VerifyAdminState {
  status: 'UNSET' | 'VERIFIED' | 'UNVERIFIED' | 'ERROR';
  message: string;
  number?: string;
}

// Function to normalize phone numbers
const normalizePhoneNumber = (phone: string): string => {
  let normalized = phone.replace(/\s+/g, '').replace(/-/g, '');
  if (normalized.startsWith('08')) {
    normalized = '+62' + normalized.substring(1);
  }
  return normalized;
};

export async function verifyAdmin(
  prevState: VerifyAdminState,
  formData: FormData
): Promise<VerifyAdminState> {
  const phoneNumber = formData.get('phoneNumber') as string;

  if (!phoneNumber || typeof phoneNumber !== 'string' || !/^[0-9+\s-]{8,15}$/.test(phoneNumber)) {
    return { status: 'ERROR', message: 'Silakan masukkan nomor WhatsApp yang valid.' };
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const normalizedInput = normalizePhoneNumber(phoneNumber);
  const isVerified = verifiedAdmins.some(adminNum => normalizePhoneNumber(adminNum) === normalizedInput);

  if (isVerified) {
    return {
      status: 'VERIFIED',
      message: 'Nomor terverifikasi sebagai Admin Resmi Rekber Nusantara.',
      number: phoneNumber,
    };
  } else {
    return {
      status: 'UNVERIFIED',
      message: 'Nomor ini BUKAN Admin Resmi. Hati-hati penipuan!',
      number: phoneNumber,
    };
  }
}
