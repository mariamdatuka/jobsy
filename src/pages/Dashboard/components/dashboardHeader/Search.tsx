import SearchIcon from "@src/assets/icons/SearchIcon";
import Input from "@src/components/general/Input";
import { useDebounce } from "@src/hooks/useDebounce";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const methods = useForm({
    defaultValues: {
      search_term: searchParams.get("search") || "",
    },
    mode: "all",
  });

  const searchTerm = methods.watch("search_term");
  const searchParam = searchParams.get("search");
  const debouncedSearch = useDebounce(searchTerm, 400);

  useEffect(() => {
    if (!debouncedSearch) {
      searchParams.delete("search");
      setSearchParams(searchParams);
      return;
    }

    setSearchParams({
      ...Object.fromEntries(searchParams),
      search: debouncedSearch,
    });
  }, [debouncedSearch]);

  useEffect(() => {
    if (!searchParam) {
      methods.setValue("search_term", "");
    }
  }, [searchParam, methods.setValue]);

  return (
    <FormProvider {...methods}>
      <form>
        <Input
          placeholder="search by company name, position"
          name="search_term"
          leftContent={<SearchIcon />}
          sx={{ minWidth: "260px", maxWidth: "400px" }}
        />
      </form>
    </FormProvider>
  );
};

export default Search;
