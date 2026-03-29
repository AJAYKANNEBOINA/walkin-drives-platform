const BACKEND_URL = import.meta.env.REACT_APP_BACKEND_URL || '';

export const api = {
  // Public
  getDrives: async (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    const resp = await fetch(`${BACKEND_URL}/api/drives${qs}`);
    if (!resp.ok) throw new Error('Failed to fetch drives');
    return resp.json();
  },

  getDrive: async (id: string) => {
    const resp = await fetch(`${BACKEND_URL}/api/drives/${id}`);
    if (!resp.ok) throw new Error('Drive not found');
    return resp.json();
  },

  getSimilarDrives: async (id: string) => {
    const resp = await fetch(`${BACKEND_URL}/api/drives/${id}/similar`);
    if (!resp.ok) return [];
    return resp.json();
  },

  getCities: async () => {
    const resp = await fetch(`${BACKEND_URL}/api/cities`);
    if (!resp.ok) return [];
    return resp.json();
  },

  subscribe: async (email: string) => {
    const resp = await fetch(`${BACKEND_URL}/api/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return resp.json();
  },

  submitApplication: async (data: {
    drive_id: string;
    full_name: string;
    email: string;
    phone?: string;
    cover_note?: string;
  }) => {
    const resp = await fetch(`${BACKEND_URL}/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({ detail: 'Failed to submit' }));
      throw new Error(err.detail || 'Failed to submit application');
    }
    return resp.json();
  },

  // Admin (requires auth token)
  admin: {
    getDrives: async (token: string) => {
      const resp = await fetch(`${BACKEND_URL}/api/admin/drives`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!resp.ok) throw new Error('Unauthorized');
      return resp.json();
    },

    createDrive: async (token: string, data: Record<string, unknown>) => {
      const resp = await fetch(`${BACKEND_URL}/api/admin/drives`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ detail: 'Failed' }));
        throw new Error(err.detail || 'Failed to create drive');
      }
      return resp.json();
    },

    updateDrive: async (token: string, id: string, data: Record<string, unknown>) => {
      const resp = await fetch(`${BACKEND_URL}/api/admin/drives/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!resp.ok) throw new Error('Failed to update drive');
      return resp.json();
    },

    deleteDrive: async (token: string, id: string) => {
      const resp = await fetch(`${BACKEND_URL}/api/admin/drives/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!resp.ok) throw new Error('Failed to delete drive');
      return resp.json();
    },

    approveDrive: async (token: string, id: string) => {
      const resp = await fetch(`${BACKEND_URL}/api/admin/drives/${id}/approve`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      return resp.json();
    },

    rejectDrive: async (token: string, id: string) => {
      const resp = await fetch(`${BACKEND_URL}/api/admin/drives/${id}/reject`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      return resp.json();
    },

    getStats: async (token: string) => {
      const resp = await fetch(`${BACKEND_URL}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!resp.ok) throw new Error('Unauthorized');
      return resp.json();
    },

    getSubscribers: async (token: string) => {
      const resp = await fetch(`${BACKEND_URL}/api/admin/subscribers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return resp.json();
    },

    getApplications: async (token: string, driveId?: string) => {
      const qs = driveId ? `?drive_id=${driveId}` : '';
      const resp = await fetch(`${BACKEND_URL}/api/admin/applications${qs}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return resp.json();
    },

    cleanupExpired: async (token: string) => {
      const resp = await fetch(`${BACKEND_URL}/api/admin/cleanup-expired`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      return resp.json();
    },
  },
};
