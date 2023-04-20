import React from "react";
import FetchHook from "../../hooks/FetchHook";
import { ContactI } from "../../models/Contact.interface";
import Herotext from "../Shared/Herotext";

const Contact = () => {
  const id: any = "ContactUs";
  const Contacts: any = FetchHook(id);

  return (
    <section>
      <Herotext text="Contact us" />
      <div className="py-16 ">
        <h2 className="text-5xl text-gray-700 font-semibold text-center pb-5 ">
          We're here to help you
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto gap-5  py-10 px-0">
          {Contacts?.data?.map((contact: ContactI) => {
            return (
              <div className="text-center bg-gray-50 rounded-lg flex flex-col gap-3 py-10 px-5">
                <h3 className="text-gray-900 font-semibold text-2xl">
                  {contact.title}
                </h3>
                <p className="text-lg text-gray-700">{contact.desc}</p>
                <a
                  href={`tel:${contact.phn}`}
                  className="text-sky-500 font-semibold text-xl"
                >
                  {contact.phn}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;
