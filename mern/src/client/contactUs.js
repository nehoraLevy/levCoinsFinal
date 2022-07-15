//import "./ContactUs.css";
import React, {useState} from "react";
import Modal from '@mui/material/Modal';
export default function ContactUs(props)
{
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(props.isOpen);
  if(!props.isOpen)
  {
    return null;
  }
  return (
  <div className="container">
    <div>
      <Modal style={{display:'flex',alignItems:'center',justifyContent:'center'}} disableEnforceFocus open={open} onClose={handleClose}  aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <h1>Contact us!</h1>
          <form target="_blank" action="https://formsubmit.co/batyarivka@gmail.com" method="POST">
            <div className="form-group">
                <div className="col">
                  <input type="text" name="name" className="form-control" placeholder="Full Name" required/>
                </div>
                <div className="col">
                  <input type="email" name="email" className="form-control" placeholder="Email Address" required/>
                </div>
            </div>
            <div className="form-group">
              <input placeholder="Your Message" className="form-control" name="message" rows="5" required></input>
            </div>
            <button type="submit" className="btn">Submit Form</button>
          </form>
        </Modal>
    </div>
  </div>)
}
//export default ContactUs;
