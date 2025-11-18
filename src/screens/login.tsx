import { useState } from 'react';
import '../style/login.css';
import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {

    const [formData, setFormData] = useState<{ username: string; password: string }>({ username: '', password: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const navigate = useNavigate();
    const {t}= useTranslation();

    function validate (name:string,value:string)  {
        switch (name) {
            case 'username':
                if (!value) return t('login.usernameRequired');
                else return '';
            case 'password':
                if (!value) return  t('login.passwordRequired');
                else if (value.length < 6) return  t('login.passwordCaracter');
                else return '';
            default:
                return '';
        }
    };

    function handleChange (e: React.FocusEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData(prev=> ({ ...prev, [name]: value }));
        if(touched[name]){
            const error = validate(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    }

    function handleBlurt (e: React.FocusEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validate(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    }

    async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setTouched({ username: true, password: true });
        const newErrors: Record<string, string> = {};

        Object.keys(formData).forEach((key) => {
            const error = validate(key, formData[key as keyof typeof formData]);
            if (error) {
                newErrors[key] = error;
            }
        });   

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const isLoggedIn = await authService.login(formData.username, formData.password);
            if (isLoggedIn) {
               
               navigate('/dashboard#dashboard');
            } else {
               setErrors({ password:  t('login.invalidCredentials') });
            }
        }
        
    }

  return (
    <div className='login_container'>
        <form className="login_form" id='form' onSubmit={handleSubmit}>
            <div>
            <h2>{ t('login.login')}</h2>
            <input 
                type="text" 
                name='username'
                placeholder= {t('login.username') }
                value={formData.username} 
                onChange={handleChange} 
                onBlur={handleBlurt} 
                autoFocus
            />
            <input 
                type="password" 
                name='password'
                placeholder={ t('login.password')} 
                value={formData.password} 
                onChange={handleChange} 
                onBlur={handleBlurt} 
            />
            {touched.password && errors.password && (
            <span className="error">{errors.password}</span>
            )}
            </div>
            <button className='login_button' type="submit">{ t('sunmit')}</button>
        </form>
    </div>
    
  );
};
export default Login;