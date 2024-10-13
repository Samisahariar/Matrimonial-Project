import React from "react";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import { fadeIn } from "./variants";
import useScrollOpacity from "@/hooks/useScrollOpacity";

const PremiunSectionCard = ({ number }) => {
    const animationDirection = ["right", "up", "left"]
    return (
        <motion.div
            variants={fadeIn(animationDirection[(number) % 3], 0.3, 1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
        >
            <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                    <CardItem
                        translateZ="50"
                        className="flex flex-row gap-4 items-center text-xl font-bold text-neutral-600 dark:text-white"
                    >
                        <div className="avatar rounded-xl">
                            <div className="mask mask-squircle h-12 w-12">
                                <img
                                    className="rounded-xl"
                                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                    alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3>Make things float in air</h3>
                            <span className="text-sm">Biodata ID : </span>
                        </div>
                    </CardItem>
                    <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                    >
                        Hover over this card to unleash the power of CSS perspective
                    </CardItem>
                    <CardItem
                        translateZ="100"
                        rotateX={20}
                        rotateZ={-10}
                        className="w-full mt-4"
                    >
                    </CardItem>
                    <div className="flex justify-between items-center mt-20">
                        <CardItem
                            translateZ={20}
                            translateX={-40}
                            as="button"
                            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                        >
                            Try now →
                        </CardItem>
                        <CardItem
                            translateZ={20}
                            translateX={40}
                            as="button"
                            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                        >
                            View-Details
                        </CardItem>
                    </div>
                </CardBody>
            </CardContainer>
        </motion.div>
    )
}

export default PremiunSectionCard;