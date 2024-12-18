import React, { useState } from 'react';
import { Box, Button, Icon, ListItemText, TextField } from '@mui/material';
import styles from '../../errors/errors.module.css';
import { ReactComponent as AccessIcon } from '../../../assets/icons/ic_action_lock.svg';
import buttonStyles from '../../login/login.module.css';

export default function RequestAccessError({ sendRequest, userName, setUserName }) {
    const [error, setError] = useState('');

    const validateNickname = (nickname) => {
        const MIN_LENGTH = 3;
        const MAX_LENGTH = 20;
        const VALID_CHARACTERS_REGEX = /^[a-zA-Z0-9_]+$/;

        if (!nickname || nickname.trim().length === 0) {
            return 'User name cannot be empty.';
        }
        if (nickname.length < MIN_LENGTH || nickname.length > MAX_LENGTH) {
            return `User name must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters.`;
        }
        if (!VALID_CHARACTERS_REGEX.test(nickname)) {
            return 'User name contains invalid characters. Only Latin letters, digits, and underscores are allowed.';
        }
        return '';
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setUserName(value);
        const validationError = validateNickname(value);
        setError(validationError);
    };

    const handleRequest = () => {
        if (!error) {
            sendRequest();
        }
    };

    return (
        <Box>
            <Box className={styles.block}>
                <Icon className={styles.icon}>
                    <AccessIcon className={styles.icon} />
                </Icon>
                <Box className={styles.info}>
                    <ListItemText disableTypography={true} className={styles.title}>
                        You don’t have access to this file
                    </ListItemText>
                    <ListItemText disableTypography={true} className={styles.text}>
                        You need to create a username for your profile to request access to this file. It will be
                        visible to the file owner.
                    </ListItemText>
                </Box>
            </Box>
            <TextField
                sx={{ mt: '-17px' }}
                margin="dense"
                onChange={handleChange}
                id="username"
                label={'User name'}
                type="email"
                fullWidth
                variant="filled"
                value={userName}
                error={!!error}
                helperText={error}
            />
            <Button
                sx={{ mt: '19px', color: !userName && '#727272 !important' }}
                component="span"
                disabled={!userName}
                className={buttonStyles.blueButton}
                onClick={handleRequest}
            >
                Request access
            </Button>
        </Box>
    );
}
