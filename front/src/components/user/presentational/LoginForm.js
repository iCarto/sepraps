import {useState} from "react";
import {useForm} from "react-hook-form";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginForm = ({handleValidation}) => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm();

    const handleFormData = data => {
        handleValidation(data.userName, data.password);
    };

    return (
        <Box
            component="form"
            method="POST"
            onSubmit={handleSubmit(handleFormData)}
            sx={{
                my: 4,
                mx: 4,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <TextField
                id="userName"
                {...register("userName", {
                    required: "Introduzca su nombre de usuario",
                    maxLength: 20,
                })}
                label="Nombre de usuario"
                name="userName"
                autoComplete="user name"
                autoFocus
                fullWidth
                margin="normal"
                error={Boolean(errors.userName)}
                helperText={errors.userName?.message}
            />
            <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                error={Boolean(errors.password)}
            >
                <InputLabel htmlFor="passwordInput">Contraseña</InputLabel>
                <OutlinedInput
                    id="passwordInput"
                    type={passwordShown ? "text" : "password"}
                    {...register("password", {
                        required: "Introduzca su contraseña",
                        maxLength: 50,
                    })}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="Mostrar/ocultar contraseña"
                                onClick={togglePassword}
                                edge="end"
                                title="Mostrar/ocultar contraseña"
                            >
                                {passwordShown ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    autoComplete="password"
                    label="Password"
                />
            </FormControl>
            <Button type="submit" fullWidth variant="contained" sx={{mt: 3}}>
                Acceder
            </Button>
        </Box>
    );
};

export default LoginForm;
