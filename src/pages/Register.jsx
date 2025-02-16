import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthInformation";
import { ThreeCircles } from "react-loader-spinner";
import useAxiosusPublic from "../hooks/useAxiosusPublic";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
//lottie animations
import Lottie from "lottie-react";
import signupAnimations from "../animations/Signupanimations.json";
//accernity uis all imports are all here down below
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";
import {
    IconBrandGithub,
    IconBrandGoogle,
    IconBrandOnlyfans,
} from "@tabler/icons-react";

const Register = () => {

    const [loader, setLoader] = useState(false);
    const axiousPublic = useAxiosusPublic();
    const { signinwithemail, updateUser, logout, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();



    const onSubmit = (data) => {
        setLoader(true);

        const { email, name, password, photoURL } = data;
        console.log(data)
        signinwithemail(email, password)
            .then(res => {
                const loggedUser = res.user;
                updateUser(name, photoURL)
                    .then(() => {
                        logout()
                            .then(res => {
                                const userInfo = {
                                    name: data.name,
                                    image: data.photoURL,
                                    email: email
                                };
                                axiousPublic.post("users", userInfo)
                                    .then(res => {
                                        if (res.data.insertedId) {
                                            setLoader(false)
                                            Swal.fire({
                                                title: 'User Created Successful.',
                                                showClass: {
                                                    popup: 'animate__animated animate__fadeInDown'
                                                },
                                                hideClass: {
                                                    popup: 'animate__animated animate__fadeOutUp'
                                                }
                                            });
                                            reset();
                                            navigate()
                                        }
                                    })
                            })
                            .catch(error => {
                                console.log(error)
                            })


                    })
                    .catch(error => {
                        setLoader(false)
                        console.log(error.message)
                    })

            })
            .catch(error => {
                setLoader(false)
                console.log(error.message)

            });
    }

    const SignupAnime = () => <Lottie animationData={signupAnimations} className="h-[70vh]"></Lottie>


    return (
        <div className="flex mx-auto flex-row w-[80%]">
            <div className="flex-col w-[50%]">
                <div className="flex-shrink-0 w-full h-[60%] py-[20%]">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <Label htmlFor="email">User-Name</Label>
                            <Input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" required />
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>
                        <div className="form-control">
                            {/*                             <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                            {errors.photoURL && <span className="text-red-600">Photo URL is required</span>} */}

                            <div className="grid w-full max-w-sm items-center gap-1.5">

                                {/*   <Label htmlFor="picture">Picture</Label>
                                <Input id="picture" type="file" /> */}

                            </div>



                        </div>
                        <div className="form-control">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" required />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>
                        <div className="form-control">

                            <Label htmlFor="email">Email</Label>
                            <Input type="password"  {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })} name="password" placeholder="password" className="input input-bordered" required />

                            {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                            {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6 flex justify-center">
                            {
                                loader ?
                                    <ThreeCircles
                                        visible={true}
                                        height="100"
                                        width="100"
                                        color="#4fa94d"
                                        ariaLabel="three-circles-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    />

                                    : <Button type="submit">Sign Up</Button>
                            }
                        </div>

                    </form>
                    <p className="px-6"><small>Already have an account <Link to="/main/login" className="text-blue-400">Login</Link></small></p>
                </div>

            </div>
            <div className="py-10">
                <SignupAnime></SignupAnime>
            </div>
        </div>
    );
};

export default Register;