// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

// const API_BASE = 'http://localhost:5000';

// export const loginUser = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
//   try {
//     const response = await fetch(`${API_BASE}/auth/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });

//     const result = await response.json();
//     if (!response.ok) {
//       return rejectWithValue(result.message || 'Login failed');
//     }

//     localStorage.setItem('token', result.token);
//     localStorage.setItem('isAuth', 'true');
//     localStorage.setItem('userEmail', result.user?.email || '');
//     localStorage.setItem('userRole', result.user?.role || 'candidate');

//     return result.user;
//   } catch (error) {
//     return rejectWithValue(error.message || 'Login failed');
//   }
// });

// export const signupUser = createAsyncThunk('auth/signup', async (data, { rejectWithValue }) => {
//   try {
//     const response = await fetch(`${API_BASE}/auth/register`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });

//     const result = await response.json();
//     if (!response.ok) {
//       return rejectWithValue(result.message || 'Signup failed');
//     }

//     localStorage.setItem('token', result.token);
//     localStorage.setItem('isAuth', 'true');
//     localStorage.setItem('userEmail', result.user?.email || '');
//     localStorage.setItem('userRole', result.user?.role || 'candidate');

//     return result.user;
//   } catch (error) {
//     return rejectWithValue(error.message || 'Signup failed');
//   }
// });

// export const verifyAuth = createAsyncThunk('auth/verify', async (_, { rejectWithValue }) => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       return rejectWithValue('No token');
//     }

//     const response = await fetch(`${API_BASE}/auth/verify`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const result = await response.json();
//     if (!response.ok) {
//       return rejectWithValue(result.message || 'Token invalid');
//     }

//     localStorage.setItem('isAuth', 'true');
//     localStorage.setItem('userEmail', result.user?.email || '');
//     localStorage.setItem('userRole', result.user?.role || 'candidate');

//     return result.user;
//   } catch (error) {
//     return rejectWithValue(error.message || 'Token invalid');
//   }
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       state.error = null;
//       localStorage.removeItem('token');
//       localStorage.removeItem('isAuth');
//       localStorage.removeItem('userEmail');
//       localStorage.removeItem('userRole');
//     },
//     restoreSession: (state) => {
//       const savedUserEmail = localStorage.getItem('userEmail');
//       const savedRole = localStorage.getItem('userRole');
//       if (localStorage.getItem('isAuth') === 'true') {
//         state.isAuthenticated = true;
//         state.user = {
//           email: savedUserEmail,
//           role: savedRole || 'candidate',
//         };
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Login failed';
//       })
//       .addCase(signupUser.pending, (state) => { state.loading = true; state.error = null; })
//       .addCase(signupUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(signupUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Signup failed';
//       })
//       .addCase(verifyAuth.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(verifyAuth.rejected, (state) => {
//         state.loading = false;
//         state.isAuthenticated = false;
//         state.user = null;
//       });
//   },
// });

// export const { logout, restoreSession } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk('auth/login', async (data) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { 
    email: data.email,
    role: data.role
  };
});

export const signupUser = createAsyncThunk('auth/signup', async (data) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { 
    email: data.email, 
    name: data.name,
    role: data.role
  };
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state) => { 
        state.loading = false; state.error = 'Login failed'; 
      })
      .addCase(signupUser.pending, (state) => { 
        state.loading = true; 
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state) => { 
        state.loading = false; state.error = 'Signup failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;