import { createAsyncThunk } from '@reduxjs/toolkit';
import service from "./service";

export const logoutUserAsync = createAsyncThunk(
    'users/logoutUserAsync', 
    async () => {
        return await service.logoutUser();
  });
