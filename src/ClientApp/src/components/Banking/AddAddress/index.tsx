import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, IconButton, Stack, TextField } from '@mui/material';
import { BankApi } from 'api';
import axios from 'axios';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAuthContext } from 'utility/hooks/useAuth';
import { Container } from '../common';

type AddressFormFields = {
  unit: string;
  streetName: string;
  state: string;
  postcode: string;
  country: string;
};

export function AddAddressPage() {
  const { token } = useAuthContext();
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  const submit = async (data: AddressFormFields) => {
    setLoading(true);
    const api = new BankApi({ apiKey: token });
    try {
      await api.apiBankAddressPost({
        houseNumber: data.unit,
        streetName: data.streetName,
        state: data.state,
        postcode: data.postcode,
        country: data.country
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
      <h1>Add new address</h1>
      <Controller
        name="unit"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            required
            {...field}
            label="Unit"
            helperText={fieldState.error ? 'Enter between 1 and 15 characters' : ' '}
            error={!!fieldState.error}
          />
        )}
        rules={{ required: true, minLength: 1, maxLength: 15 }}
      />
      <Controller
        name="streetName"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            required
            {...field}
            label="Street Name"
            helperText={fieldState.error ? 'Enter between 3 and 22 characters' : ' '}
            error={!!fieldState.error}
          />
        )}
        rules={{ required: true, minLength: 3, maxLength: 22 }}
      />
      <Stack direction="row" justifyContent="space-between">
        <Controller
          name="state"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              required
              {...field}
              label="State"
              helperText={fieldState.error ? 'Enter between 3 and 22 characters' : ' '}
              error={!!fieldState.error}
            />
          )}
          rules={{ required: true, minLength: 3, maxLength: 22 }}
        />
        <Controller
          name="postcode"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              required
              {...field}
              label="Postcode"
              helperText={fieldState.error ? 'Enter between 3 and 22 characters' : ' '}
              error={!!fieldState.error}
            />
          )}
          rules={{ required: true, minLength: 3, maxLength: 22 }}
        />
      </Stack>
      <Controller
        name="country"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            required
            {...field}
            label="Country"
            helperText={fieldState.error ? 'Enter between 3 and 22 characters' : ' '}
            error={!!fieldState.error}
          />
        )}
        rules={{ required: true, minLength: 3, maxLength: 22 }}
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
    </Container>
  );
}
