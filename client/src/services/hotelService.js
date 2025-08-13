import { config } from '../config';

// Hotel API service
class HotelService {
  constructor() {
    this.baseURL = `${config.API_BASE_URL}/hotels`;
  }

  // Get hotels with filtering and pagination
  async getHotels(filters = {}, options = {}) {
    try {
      const queryParams = new URLSearchParams();

      // Add filter parameters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            value.forEach(item => queryParams.append(key, item));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });

      // Add option parameters
      Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });

      const response = await fetch(`${this.baseURL}?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching hotels:', error);
      throw error;
    }
  }

  // Get single hotel by ID
  async getHotelById(id) {
    try {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching hotel:', error);
      throw error;
    }
  }

  // Get featured hotels
  async getFeaturedHotels(limit = 6) {
    try {
      const response = await fetch(`${this.baseURL}/featured?limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching featured hotels:', error);
      throw error;
    }
  }

  // Get search suggestions
  async getSearchSuggestions(query) {
    try {
      if (!query || query.length < 2) {
        return { success: true, data: { hotels: [], cities: [] } };
      }

      const response = await fetch(`${this.baseURL}/suggestions?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
      throw error;
    }
  }

  // Check hotel availability
  async checkAvailability(hotelId, checkIn, checkOut) {
    try {
      const response = await fetch(`${this.baseURL}/${hotelId}/availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ checkIn, checkOut })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking availability:', error);
      throw error;
    }
  }

  // Add review to hotel
  async addReview(hotelId, rating, comment) {
    try {
      const response = await fetch(`${this.baseURL}/${hotelId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ rating, comment })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  }

  // Create hotel (admin only)
  async createHotel(hotelData) {
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(hotelData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating hotel:', error);
      throw error;
    }
  }

  // Update hotel (admin only)
  async updateHotel(hotelId, hotelData) {
    try {
      const response = await fetch(`${this.baseURL}/${hotelId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(hotelData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating hotel:', error);
      throw error;
    }
  }

  // Delete hotel (admin only)
  async deleteHotel(hotelId) {
    try {
      const response = await fetch(`${this.baseURL}/${hotelId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting hotel:', error);
      throw error;
    }
  }
}

// Create singleton instance
const hotelService = new HotelService();

export default hotelService;
