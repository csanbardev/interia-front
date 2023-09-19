export const postReq = async (url, data, token) => {

  try {
    const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(data) })

    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  } catch (error) {
    throw error;
  }


}

export const patchReq = async (url, data, token) => {

  try {
    const response = await fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(data) })

    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  } catch (error) {
    throw error;
  }


}

export const patchAvatar = async (url, data, token) => {
  try {
    const formData = new FormData()
    formData.append('avatar', data.avatar[0])
    
    const response = await fetch(url, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });

    console.log(response)

    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();

  } catch (error) {
    console.error('Error en patchAvatar:', error);
    throw error;
  }
}

export const getReq = async (url, token) => {
  try {
    const response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } })

    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export const deleteReq = async (url, data, token) => {

  try {
    const response = await fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(data) })

    if (!response.ok) {
      throw new Error(response.status);

    }

    return response.json();
  } catch (error) {
    throw error;
  }


}