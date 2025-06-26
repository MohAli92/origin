import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Container, TextField, Typography, Paper, Stack, Alert, Link,
  FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, InputAdornment
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';
import { Email, Person, Wc, CalendarToday, Phone, WhatsApp } from '@mui/icons-material';

const Login: React.FC = () => {
  const [step, setStep] = useState(1); // 1: بيانات, 2: OTP
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const validatePhone = (phone: string) => {
    // يجب أن يبدأ بـ + ويحتوي على 10 أرقام على الأقل
    return /^\+\d{10,}$/.test(phone);
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!firstName.trim()) return setError('Please enter your first name');
    if (!lastName.trim()) return setError('Please enter your last name');
    if (!gender) return setError('Please select your gender');
    if (!dateOfBirth) return setError('Please select your date of birth');
    if (!validatePhone(phone)) return setError('Please enter a valid phone number (e.g. +201234567890)');
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/send-otp`, { phone });
      setStep(2);
      setSuccess('OTP sent via WhatsApp!');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!otp.trim()) return setError('Please enter the code you received on WhatsApp');
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/verify-otp`, {
        phone, code: otp, firstName, lastName, email, gender
      });
      setSuccess('Account verified and logged in!');
      // يمكنك هنا حفظ بيانات المستخدم في localStorage أو context
      setTimeout(() => navigate('/'), 1000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to verify code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 3, boxShadow: '0 4px 24px 0 rgba(60,72,88,0.10)' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
            alt="Welcome Food"
            style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', marginBottom: 16, boxShadow: '0 2px 8px rgba(60,72,88,0.10)' }}
          />
          <Typography variant="h4" fontWeight={600} align="center" gutterBottom>
            Share Dish
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
            Create an account to share and discover meals!
          </Typography>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>{error}</Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mt: 2, mb: 2 }}>{success}</Alert>
        )}
        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <Stack spacing={2} mt={3}>
              <TextField
                label="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                fullWidth
                required
                InputProps={{ startAdornment: (<InputAdornment position="start"><Person /></InputAdornment>) }}
              />
              <TextField
                label="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                fullWidth
                required
                InputProps={{ startAdornment: (<InputAdornment position="start"><Person /></InputAdornment>) }}
              />
              <TextField
                label="Phone Number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                fullWidth
                required
                placeholder="e.g. +201234567890"
                InputProps={{ startAdornment: (<InputAdornment position="start"><Phone /></InputAdornment>) }}
              />
              <TextField
                label="Email (optional)"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
                InputProps={{ startAdornment: (<InputAdornment position="start"><Email /></InputAdornment>) }}
              />
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  label="Gender"
                  onChange={(e: SelectChangeEvent) => setGender(e.target.value)}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                  <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  value={dateOfBirth}
                  onChange={newValue => setDateOfBirth(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      InputProps: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarToday />
                          </InputAdornment>
                        ),
                      },
                    }
                  }}
                />
              </LocalizationProvider>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ fontWeight: 600, py: 1.2, fontSize: '1rem', mt: 1 }}
              >
                {loading ? 'Please wait...' : 'Send Code via WhatsApp'}
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <WhatsApp color="success" />
                <Typography variant="body2" color="text.secondary">
                  To receive the code via WhatsApp, send <b>join government-think</b> to <b>+14155238886</b> first.
                </Typography>
                <Button
                  variant="outlined"
                  color="success"
                  size="small"
                  startIcon={<WhatsApp />}
                  href="https://wa.me/14155238886?text=join%20government-think"
                  target="_blank"
                  sx={{ ml: 1 }}
                >
                  Open WhatsApp
                </Button>
              </Box>
            </Stack>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            <Stack spacing={2} mt={3}>
              <TextField
                label="Enter the code you received on WhatsApp"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                fullWidth
                required
                autoFocus
              />
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ fontWeight: 600, py: 1.2, fontSize: '1rem', mt: 1 }}
              >
                {loading ? 'Please wait...' : 'Verify Code'}
              </Button>
              <Button
                variant="text"
                color="primary"
                onClick={() => setStep(1)}
                sx={{ mt: 1 }}
              >
                Back to Registration
              </Button>
            </Stack>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default Login;