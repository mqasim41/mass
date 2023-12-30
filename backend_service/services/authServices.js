export const refreshAccessToken = async (expiredAccessToken, refreshToken) => {
  try 
  {
    const response = await fetch('http://localhost:5000/api/refresh-token', {
      method: 'POST',
      headers: 
      {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ expiredAccessToken, refreshToken }),
    });

    if (!response.ok) 
    {
      throw new Error('Failed to refresh access token');
    }

    const { newAccessToken } = await response.json(); // Extract the new access token
    // Storing access token in local storage
    localStorage.setItem('accessToken', newAccessToken);

    return newAccessToken; // Return the new access token if needed
  } 
  catch (error) 
  {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

export const handleTokenExpiration = async () => 
{
  const accessToken = getAccessToken();

  // Check if access token is present and not expired
  if (accessToken) 
  {
    try 
    {
      const tokenData = jwt_decode(accessToken);
      const currentTime = Date.now() / 1000;

      // If token is expired (considering a buffer of 60 seconds)
      if (tokenData.exp < currentTime + 60) 
      {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) 
        {
          const newAccessToken = await refreshAccessToken(refreshToken);
          return newAccessToken;
        } 
        else 
        {
          // Handle case when refreshToken is not available
          throw new Error('Refresh token not available');
        }
      } 
      else 
      {
        return accessToken; // Token is valid
      }
    } 
    catch (error) 
    {
      console.error('Error handling token expiration:', error);
      throw error;
    }
  } 
  else 
  {
    // Handle case when accessToken is not available
    throw new Error('Access token not available');
  }
};
