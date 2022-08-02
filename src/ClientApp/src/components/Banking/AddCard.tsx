import { AddCard, Close } from '@mui/icons-material';
import { Alert, IconButton, Stack, TextField } from '@mui/material';
import { BankApi } from 'api';
import moment, { Moment } from 'moment';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAuthContext } from 'utility/hooks/useAuth';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { Container } from './common';

/**
 * Modified from https://stackoverflow.com/a/23222600
 */
function luhnCheck(val: string) {
  let sum = 0;
  for (let i = 0; i < val.length; i++) {
    let intVal = parseInt(val[i]);
    if (i % 2 == 0) {
      intVal *= 2;
      if (intVal > 9) {
        intVal = 1 + (intVal % 10);
      }
    }
    sum += intVal;
  }
  return sum % 10 == 0;
}

type CreditCardFormFields = {
  cardNumber: string;
  expiration: Moment;
  cvc: string;
  nameOnCard: string;
  dateOfBirth: Moment;
};
export function AddCardPage() {
  const { token } = useAuthContext();
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  const submit = async (data: CreditCardFormFields) => {
    setLoading(true);
    const api = new BankApi({ apiKey: token });
    try {
      await api.apiBankCardPost({
        number: data.cardNumber,
        expiry: data.expiration.toDate(),
        secret: data.cvc,
        name: data.nameOnCard,
        doB: data.dateOfBirth.toDate()
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const cause = (error.response?.data as any)?.errors?.[0] ?? error.message;
        setSubmissionError(cause);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <h1>Add new card</h1>
        <Controller
          name="nameOnCard"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              required
              {...field}
              label="Name on Card"
              helperText={fieldState.error ? 'Enter between 3 and 22 characters' : ' '}
              error={!!fieldState.error}
            />
          )}
          rules={{ required: true, minLength: 3, maxLength: 22 }}
        />
        <Controller
          name="cardNumber"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              required
              {...field}
              label="Card Number"
              helperText={fieldState.error ? 'Invalid Card Number' : ' '}
              error={!!fieldState.error}
              InputProps={{
                endAdornment: <AddCard />
              }}
            />
          )}
          rules={{ required: true, validate: (val) => luhnCheck(val) }}
        />
        <Stack direction="row" gap={3}>
          <Controller
            name="expiration"
            control={control}
            render={({ field, fieldState }) => (
              <DesktopDatePicker
                {...field}
                label="Expiry date"
                inputFormat="MM/yyyy"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    helperText={fieldState.error ? 'Must be in the future' : ' '}
                    error={!!fieldState.error}
                  />
                )}
              />
            )}
            rules={{ required: true, validate: (date: Moment) => date.isSameOrAfter(moment()) }}
          />
          <Controller
            name="cvc"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                required
                {...field}
                label="CVC"
                helperText={fieldState.error ? 'Must be exactly 3 digits' : ' '}
                error={!!fieldState.error}
              />
            )}
            rules={{
              required: true,
              validate: (val: string) => val.length === 3 && !isNaN(parseInt(val))
            }}
          />
        </Stack>
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field, fieldState }) => (
            <DesktopDatePicker
              {...field}
              label="Date of Birth"
              inputFormat="DD/MM/yyyy"
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  helperText={fieldState.error ? 'Must be in the past' : ' '}
                  error={!!fieldState.error}
                />
              )}
            />
          )}
          rules={{ required: true, validate: (date: Moment) => date.isBefore(moment()) }}
        />
        <LoadingButton
          variant="contained"
          onClick={handleSubmit(submit as any)}
          loading={loading}
          disabled={submissionError !== ''}
        >
          Submit
        </LoadingButton>
        {submissionError !== '' && (
          <Alert
            sx={{ cursor: 'pointer' }}
            severity="error"
            onClick={() => setSubmissionError('')}
            action={
              <IconButton>
                <Close />
              </IconButton>
            }
          >
            {submissionError}
          </Alert>
        )}
      </LocalizationProvider>
    </Container>
  );
}
