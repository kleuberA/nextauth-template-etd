// ex: components/ChangePasswordForm.tsx
import { useState } from 'react';

export function ChangePasswordForm() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const res = await fetch('/api/auth/change-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldPassword, newPassword }),
        });

        const data = await res.json();
        setMessage(data.message || 'Erro');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                placeholder="Senha atual"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="submit">Trocar senha</button>
            {message && <p>{message}</p>}
        </form>
    );
}
