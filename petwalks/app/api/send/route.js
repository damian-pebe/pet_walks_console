'use server'
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(props) {

const txt = props.txt
const sender = props.sender

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [sender],
      subject: "Pet Walks Status",
      text:txt
      

      
    });

    if (error) {
      console.log(Response.json({ error }, { status: 500 }))
    }

    console.log( Response.json({ data }))
  } catch (error) {
    console.log(Response.json({ error }, { status: 500 }))  }
}

export async function AcceptReportReqeust(props) {
  const documentINE = props.ine
  const documentAdressProof = props.adressProof 
  const sender = props.sender

  const htmlContent = `
    <h1>Your report request has been successfully accepted</div>
    <h2>Here are the reported user's documents , we are sorry to hear about what happened</h2>
    <h3>Please review the document at the following link for INE information:</h3>
    <a href="${documentINE}">INE</a>
    <h3>Please review the document at the following link for Adress Proof information:</h3>
    <a href="${documentAdressProof}">Adress Proof</a>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [sender],
      subject: "Pet Walks Status",
      html: htmlContent // Use the html property
    });

    if (error) {
      console.log(Response.json({ error }, { status: 500 }));
      return Response.json({ error }, { status: 500 });
    }

    console.log(Response.json({ data }));
    return Response.json({ data });
  } catch (error) {
    console.log(Response.json({ error }, { status: 500 }));
    return Response.json({ error }, { status: 500 });
  }
}
