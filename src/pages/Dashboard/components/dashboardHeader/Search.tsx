import SearchIcon from "@src/assets/icons/SearchIcon";
import Input from "@src/components/general/Input";
import { FormProvider, useForm } from "react-hook-form";

const Search = () => {
  const methods = useForm({
    defaultValues: {
      search_term: "",
    },
    mode: "all",
  });

  const handleSearchSubmit = (data: any) => {
    console.log("Search submitted with term:", data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSearchSubmit)}>
        <Input
          placeholder="search by company name, position"
          name="search_term"
          leftContent={<SearchIcon />}
          sx={{ minWidth: "260px" }}
        />
      </form>
    </FormProvider>
  );
};

export default Search;
