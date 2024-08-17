import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import { selectFilteredContacts } from "../../redux/contacts/contactsSlice";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <div className={s.container}>
      <ul className={s.contactList}>
        {filteredContacts.length ? (
          filteredContacts.map((contact) => (
            <li key={contact.id}>
              <Contact
                name={contact.name}
                number={contact.number}
                id={contact.id}
              />
            </li>
          ))
        ) : (
          <h2>No data found</h2>
        )}
      </ul>
    </div>
  );
};

export default ContactList;
