const styles = {
    heading: "font-[600] sm:text-[22px] text-[20px] ",
    paragraph: "font-[400] text-dimBlack text-[14px] ",

    flexCenter: "flex justify-center items-center",
    flexStart: "flex justify-center items-start",

    paddingX: "sm:px-6 px-16",
    paddingY: "sm:py-2 py-6",

    marginX: "sm:mx-6 mx-16",
    marginY: "sm:my-2 my-6",
};

export const layout = {
    cardContainer: 'flex flex-row flex-wrap items-center justify-center',
    section: `flex flex-col items-center justify-center ${styles.paddingY} ${styles.paddingX}`,
};

export default styles;