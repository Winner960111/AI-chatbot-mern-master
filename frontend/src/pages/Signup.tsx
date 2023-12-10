import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

import bot2 from "/page-photos/robot-2.png";

import PageImage from "../components/auth/PageImage";
import FormLabel from "../components/auth/FormLabel";

import styles from "./AuthForm.module.css";
import Button from '../components/shared/Button';

import { useAuth } from "../context/context";

import axios from 'axios'
axios.defaults.baseURL = "http://localhost:5001/api";
axios.defaults.withCredentials = true; // Enable sending credentials (e.g., cookies) in cross-origin requests

const Signup = () => {
    const [buttonName, setButtonName] = useState('Login')

    const navigate = useNavigate

    const auth = useAuth()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    }

	return (
		<div className={styles.parent}>
			<div>
				<PageImage
					src={bot2}
					alt='login chat bot image'
					className={styles.image}
				/>
			</div>
			<div>
				<h2>Create New account</h2>
				<div className={styles.form}>
					<FormLabel
						className={styles.auth_label}
						htmlFor='username'
						id='username'
                        name='username'
						type='text'
						required={true}
						maxLength={25}
						minLength={2}
						label='Your Name'
						value=''
						onChange={() => {}}
						inputPH='John Doe'
					/>

					<FormLabel
						className={styles.auth_label}
						htmlFor='email'
						id='email'
                        name='email'
						type='text'
						required={true}
						maxLength={20}
						minLength={5}
						label='E-Mail'
						value=''
						onChange={() => {}}
						inputPH='name@example.com'
					/>

					<FormLabel
						className={styles.auth_label}
						htmlFor='Password'
                        name='password'
						id='password'
						type='password'
						required={true}
						maxLength={16}
						minLength={8}
						label='Password'
						value=''
						onChange={() => {}}
						inputPH='Password'
					/>

					<FormLabel
						className={styles.auth_label}
						htmlFor='Confirm-Password'
						id='confirm-password'
                        name='confirm-password'
						type='password'
						required={true}
						maxLength={16}
						minLength={8}
						label='Confirm Password'
						value=''
						onChange={() => {}}
						inputPH='Confirm Password'
					/>

                    <Button buttonLabel={buttonName} type="submit" className={styles.button}/>
				</div>
				<p>
					Already have an account ? <Link to='/login'>Login </Link> now{" "}
				</p>
			</div>
		</div>
	);
};

export default Signup;
