import React from "react";

const Title = ({ head, subhead = false }) => {
    return (
        <section className="">
            <div className="sm:container">
                <div className="dark:border-dark-3">
                    <h2 className="text-2xl font-semibold text-dark dark:text-white">
                        {head}
                    </h2>
                    {
                        subhead && 
                        <p className=" text-sm font-medium text-body-color dark:text-dark-6">
                            {subhead}
                        </p>
                    }
                </div>
            </div>
        </section>
    );
};

export default Title;