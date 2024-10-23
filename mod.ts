import { Application, Context } from "https://deno.land/x/abc@v1.3.3/mod.ts";
import { readAll } from "https://deno.land/std@0.115.1/io/util.ts";

// Initialize the application
const app = new Application();

// Helper function to parse the request body
async function parseBody(context: Context) {
  const body = await readAll(context.request.body); // Read the request body as Uint8Array
  const decoder = new TextDecoder();
  const decodedBody = decoder.decode(body); // Decode the body to a string
  return JSON.parse(decodedBody); // Parse the JSON string into an object
}

// Define the /register-invoice POST route
app.post("/register-invoice", async (context) => {
  try {
    // Parse the request body
    const body = await parseBody(context);

    const {
      name,
      address,
      plz, // Postal Code
      ort, // City
      land, // Country
      email,
      telefon,
    } = body;

    // Here you can validate the data or save it to a database, if necessary
    console.log("Received Data:", body);

    // Respond with success
    await context.json({
      message: "Invoice registered successfully",
      data: body,
    }, 200);
  } catch (error) {
    // Handle errors (e.g., missing fields or invalid data)
    await context.json({ message: "Invalid request", error: error.message }, 400);
  }
});

// Start the server on port 8000
console.log("Server is running on http://localhost:8000");
await app.start({ port: 8000 });
