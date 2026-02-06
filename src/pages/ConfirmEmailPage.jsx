import React from 'react';
import { ConfirmEmailView } from '../components/ConfirmEmailView';

export function ConfirmEmailPage({ email, onBackToLogin }) {
  return <ConfirmEmailView email={email} onBackToLogin={onBackToLogin} />;
}
