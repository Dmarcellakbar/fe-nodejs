const API_URL = `${import.meta.env.VITE_ENDPOINT_URL_DATABASE}/api/upload`

export default {
  async upload(file) {
    const formData = new FormData();
    formData.append('file', file); // 'file' matches the backend
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        // Don't add Content-Type here!
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Upload failed');
    }

    return response.json();
  }
}
