Updated: db.js to work on my machine because My SQL requires the user the provide a password.
Removed: body-parser package. Because the built-in express.json() middleware function was introduced as a replacement for the body-parser package, which means you no longer need to install and require the body-parser module separately if you're using Express.js version 4.16.0 or later.

Todo::: Customers class has no error handling or checking for empty data, nor does the Reservation class

TODO::::
*************************************************************************************************************************
Part Five: Full Names
In several templates, we show customer names as {{ firstName }} {{ lastName }}. This is slightly tedious, that we have to write out both fields, but also might be inflexible for future data changes: what if we added a middle name field later? What if we added a prefix field for labels like “Ms.” or “Dr.”?

Add a function, fullName, to the Customer class. This should (for now) return first and last names joined by a space. Change the templates to refer directly to this.

**************************************************************************************************************************
Part Six: Saving Reservations
We’ve already written a .save() method for customers. This either adds a new customer if they’re new, or updates the existing record if there are changes.

We don’t yet have a similar method for reservations, but we need one in order to save reservations. Write this.

***************************************************************************************************************************
Part Seven: Add Search Functionality
It would be nice to search for a customer by name, rather than having to find them in a list. Add a quick search form to the bootstrap navigation bar to search for a customer by name.

Do this by continuing the pattern of abstracting database operations to the model classes — any route(s) you write shouldn’t directly use the database. Think of a good name for any new methods on the class.

You can either make a new route and template to show results, or you could probably make it work with the existing listing index route and template (as you’d prefer).