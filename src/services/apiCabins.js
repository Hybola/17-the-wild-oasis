import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}
export async function createEditCabin(newCabin, id) {
  //To check if the image is string URL of Supabase
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  //To make the image name unique and replace all the "/" with empty string
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  //If the image has no Supabase path, the create a new path
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //1. Create new cabin
  let query = supabase.from("cabins");
  //A. CREATE NEW CABIN
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  //B. EDIT CABIN
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error("Cabins could wasn't created");
  }
  //2. upload image file to canin-image bucket on Supabase
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. delete the created cabin in case there is error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log("Error Upload file ==>" + storageError);
    throw new Error("image was not uploaded and the cabin is not created");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
