// import Label from "../../../src/components/ui";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  const renderInputsByComponent = (getcontrolItem) => {
    const value = formData[getcontrolItem.name] || "";
    let element = null;
    switch (getcontrolItem.componentType) {
      case "input":
        element = (
          <Input
            name={getcontrolItem.name}
            placeholder={getcontrolItem.placeholder}
            id={getcontrolItem.name}
            type={getcontrolItem.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getcontrolItem.name]: e.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getcontrolItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getcontrolItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getcontrolItem.options && getcontrolItem.options.length > 0
                ? getcontrolItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

        break;
      case "textarea":
        element = (
          <Textarea
            name={getcontrolItem.name}
            placeholder={getcontrolItem.placeholder}
            id={getcontrolItem.id}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getcontrolItem.name]: e.target.value,
              })
            }
          />
        );
        break;
      default:
        element = (
          <input
            name={getcontrolItem.name}
            placeholder={getcontrolItem.placeholder}
            id={getcontrolItem.name}
            type={getcontrolItem.type}
          />
        );
        break;
    }
    return element;
  };
  
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col gap-4">
        {formControls.map((controlItem) => (
          <div className="flex flex-col gap-1.5" key={controlItem.name}>
            <Label
              htmlFor={controlItem.name}
              className="text-sm font-medium text-gray-700"
            >
              {controlItem.label}
            </Label>
            {renderInputsByComponent(controlItem)}
          </div>
        ))}
      </div>

      <Button
        disabled={isBtnDisabled}
        type="submit"
        className="
      mt-6 w-full 
      bg-blue-600 
      text-white 
      font-medium 
      transition-colors 
      hover:bg-blue-500 
    ">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
