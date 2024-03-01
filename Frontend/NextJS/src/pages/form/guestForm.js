import { BasicLayout } from "@/layouts";
import { Separator } from "@/components/Shared";
import { FormTest } from "@/components/Form";





export default function fromPage() {
  return (
    <>
      <BasicLayout>
        <Separator height={100} />
        
          <FormTest guest={true} />
        
        <Separator height={110} />

      </BasicLayout>
    </>
  );
}
