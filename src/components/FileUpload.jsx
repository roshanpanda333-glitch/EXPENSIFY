import React, { useCallback, useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';
import { parseCSV, normalizeTransaction } from '../utils/csvHelpers';

export const FileUpload = () => {
    const { addTransactions } = useExpenses();
    const [isDragging, setIsDragging] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, uploading, success, error
    const [message, setMessage] = useState('');

    const handleFile = async (file) => {
        if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
            setStatus('error');
            setMessage('Please upload a CSV file.');
            return;
        }

        setStatus('uploading');
        try {
            const data = await parseCSV(file);
            const normalized = data.map(normalizeTransaction);

            // Basic validation: check if entries have amounts
            const validTransactions = normalized.filter(t => t.date && !isNaN(t.amount));

            if (validTransactions.length === 0) {
                throw new Error('No valid transactions found.');
            }

            addTransactions(validTransactions);
            setStatus('success');
            setMessage(`Successfully imported ${validTransactions.length} transactions.`);

            setTimeout(() => setStatus('idle'), 3000);
        } catch (err) {
            console.error(err);
            setStatus('error');
            setMessage('Failed to parse file. Check format.');
        }
    };

    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => {
        setIsDragging(false);
    };

    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFile(files[0]);
        }
    };

    const onInputChange = (e) => {
        if (e.target.files.length) {
            handleFile(e.target.files[0]);
        }
    };

    return (
        <div style={{ marginBottom: '2rem' }}>
            <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                style={{
                    border: `2px dashed ${isDragging ? 'var(--primary)' : 'var(--border)'}`,
                    borderRadius: '12px',
                    padding: '3rem',
                    textAlign: 'center',
                    backgroundColor: isDragging ? '#eff6ff' : 'var(--bg-card)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                }}
            >
                <input
                    type="file"
                    accept=".csv"
                    onChange={onInputChange}
                    style={{ display: 'none' }}
                    id="csv-upload"
                />
                <label htmlFor="csv-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        backgroundColor: status === 'success' ? '#dcfce7' : status === 'error' ? '#fee2e2' : '#f1f5f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: status === 'success' ? 'var(--success)' : status === 'error' ? 'var(--danger)' : 'var(--text-muted)'
                    }}>
                        {status === 'success' ? <CheckCircle size={32} /> : status === 'error' ? <AlertCircle size={32} /> : <Upload size={32} />}
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                            {status === 'uploading' ? 'Processing...' : 'Upload Transactions'}
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                            Drag and drop your CSV file here, or click to browse
                        </p>
                    </div>
                </label>

                {message && (
                    <div style={{
                        marginTop: '1rem',
                        fontSize: '0.875rem',
                        color: status === 'error' ? 'var(--danger)' : 'var(--success)',
                        fontWeight: '500'
                    }}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};
