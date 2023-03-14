import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../hoc/AuthProvider";
import {Link, useNavigate} from "react-router-dom";

export default function Header() {
    const { loginUser, isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate()
    const linkToHome = useRef(null);

    const [register, setRegister] = useState(() => {
        return {
            email: "",
            password: "",
        };
    });

    useEffect(() => {
        // вызываем программный клик на кнопку "ссылка - переход"
        if (isLoggedIn) {
            navigate("/home")
            //linkToHome.current.click();
        }
    }, [isLoggedIn])

    const changeInputRegister = (event) => {
        event.persist();
        setRegister((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            };
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        console.log('Submit');
        await loginUser(register.email, register.password);

        // Тут происходит задержка, видимо условие if ниже выполняется быстрее чем isLoggedIn
        //Успевает менять своё состояние
        alert("Проверка на состояние авторизации:" + isLoggedIn)
    };

    return (
        <div className="align-middle">
            <div className='shadow-formShadow bg-WhiteThemeMainColor1 min-w-[315px] p-6 my-auto rounded-2xl
                            sm:px-10 sm:py-8 sm:min-w-[500px]'>
                <h2 className='text-center text-2xl font-medium mb-6
                               sm:text-3xl'>
                    Авторизация:
                </h2>
                <div className="my-4 mx-auto border-b-4 border-Accent_light rounded-full"/>
                <form onSubmit={submit}>
                    <div className='mb-3.5'>
                        <input className='w-full border border-darkGray px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light'
                               type="email"
                               id="email"
                               placeholder='Email'
                               name="email"
                               value={register.email}
                               onChange={changeInputRegister}
                               formNoValidate
                        />
                    </div>

                    <div className='mb-2'>
                        <input className='w-full border border-darkGray px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light'
                               type="password"
                               id="password"
                               placeholder="Пароль"
                               name="password"
                               value={register.password}
                               onChange={changeInputRegister}
                        />
                    </div>

                    <div className='flex items-center justify-center flex-col'>
                        <button className='bg-WhiteThemeMainColor2 px-12 py-2 rounded-lg mt-5 font-medium
                                           sm:px-20' type="submit" >
                            Войти
                        </button>
                        {/* задаем ref для ссылки на страницу Home */}
                        <Link to='/home' ref={linkToHome} className='hidden' >
                            <button>ссылка - переход</button>
                        </Link>
                        <span className='text-xs font-light mt-3
                                        sm:text-sm'>Нет аккаунта?</span>
                        <a className='text-xs text-Accent_light font-light
                                     sm:text-sm' href='/Registration' >
                            Подайте заявку на регистрацию
                        </a>
                    </div>

                </form>
            </div>
        </div>
    )
}
