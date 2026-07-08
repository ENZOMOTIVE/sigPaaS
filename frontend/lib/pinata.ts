

import axios from 'axios';

export async function uploadToPinata(file: File | string | Blob) {
  const formData = new FormData();
  const PINATA_API_KEY = 'b3922c3aa54aad435cc1';
  const PINATA_SECRET_KEY = '0263a6f3b4ad8948fb39dc76556f2029ccb860cb2c2c530b963e2f3ca7aef2e1';

  if (typeof file === 'string') {
    // Handle metadata JSON
    const blob = new Blob([file], { type: 'application/json' });
    formData.append('file', new File([blob], 'metadata.json', { type: 'application/json' }));
  } else if (file instanceof Blob) {
    // Handle Blob (including File)
    formData.append('file', file, 'file');
  } else {
    // Handle File
    formData.append('file', file);
  }

  try {
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        headers: {
          'Content-Type': `multipart/form-data`,
          pinata_api_key: PINATA_API_KEY!,
          pinata_secret_api_key: PINATA_SECRET_KEY!,
        },
      }
    );
    return response.data.IpfsHash;
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    throw error;
  }
}

