"use client";
import CollapsibleList from "@/app/course/[courseId]/components/collapsible/collapsible-list";
import { useDebounceFunction } from "@/hooks/useDebounce";
import { Button } from "@/lib/shadcn/button";
import { FileSizeOption } from "@/models/assignment";
import { AssignmentTopic } from "@/models/topic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z, ZodType } from "zod";
import AvailabilitySetting, {
  AvailabilitySettingForm,
} from "./setting-items/availability";
import GeneralSetting, { GeneralSettingForm } from "./setting-items/general";
import SubmissionSetting, {
  SubmissionSettingForm,
} from "./setting-items/submission";
import {
  defaultAvailabilitySetting,
  defaultGeneralSetting,
  defaultSubmissionSetting,
} from "./static-data";

const generalSettingSchema: ZodType<GeneralSettingForm> = z.object({
  title: z.string().min(1, "Assignment name must be at least 1 character."),
  description: z.string(),
});

const availabilitySettingSchema: ZodType<AvailabilitySettingForm> = z
  .object({
    open: z.object({
      enabled: z.boolean(),
      value: z.string(),
    }),
    close: z.object({
      enabled: z.boolean(),
      value: z.string(),
    }),
    remindToGrade: z.object({
      enabled: z.boolean(),
      value: z.string(),
    }),
  })
  .refine(
    (data) => {
      if (data.open.enabled && data.close.enabled) {
        return new Date(data.open.value) < new Date(data.close.value);
      }
      return true;
    },
    { message: "Close date must be after open date" }
  );

const submissionSettingSchema: ZodType<SubmissionSettingForm> = z.object({
  maximumFile: z.object({
    enabled: z.boolean(),
    value: z.number(),
  }),
  maximumFileSize: z.object({
    enabled: z.boolean(),
    value: z.nativeEnum(FileSizeOption),
  }),
});

export type AssignmentSettingForm = {
  generalSettingForm: GeneralSettingForm;
  availabilitySettingForm: AvailabilitySettingForm;
  submissionSettingForm: SubmissionSettingForm;
};

// Combine child schemas into one
const schema: ZodType<AssignmentSettingForm> = z.object({
  generalSettingForm: generalSettingSchema,
  availabilitySettingForm: availabilitySettingSchema,
  submissionSettingForm: submissionSettingSchema,
});

interface Props {
  assignment: AssignmentTopic;
  onSubmitAssignmentSetting?: (data: AssignmentTopic) => void;
}
const SettingList = ({ assignment, onSubmitAssignmentSetting }: Props) => {
  const handleGetGeneralSetting = (assignment: AssignmentTopic) => {
    const { title } = assignment;
    const { description } = assignment.data;
    const generalSetting: GeneralSettingForm = {
      title,
      description,
    };
    return generalSetting;
  };

  const handleGetAvailabilitySetting = (assignment: AssignmentTopic) => {
    const { remindToGrade, open, close } = assignment.data;
    console.log("assignment", assignment);
    const currentDate = new Date().toISOString();
    const availabilitySetting: AvailabilitySettingForm = {
      open: {
        enabled: open !== null,
        value: open || currentDate,
      },
      close: {
        enabled: close !== null,
        value: close || currentDate,
      },
      remindToGrade: {
        enabled: remindToGrade !== null,
        value: remindToGrade || currentDate,
      },
    };
    return availabilitySetting;
  };

  const handleGetSubmisisonSetting = (assignment: AssignmentTopic) => {
    const { maximumFile, maximumFileSize } = assignment.data;
    const submissionSetting: SubmissionSettingForm = {
      maximumFile: {
        enabled: maximumFile !== null,
        value: maximumFile || 5,
      },
      maximumFileSize: {
        enabled: maximumFileSize !== null,
        value: maximumFileSize || FileSizeOption["5MB"],
      },
    };
    return submissionSetting;
  };

  const initGeneralSetting = useMemo(() => {
    return assignment
      ? handleGetGeneralSetting(assignment)
      : defaultGeneralSetting;
  }, [assignment]);
  const initAvailabilitySetting = useMemo(() => {
    return assignment
      ? handleGetAvailabilitySetting(assignment)
      : defaultAvailabilitySetting;
  }, [assignment]);
  const initSubmissionSetting = useMemo(() => {
    return assignment
      ? handleGetSubmisisonSetting(assignment)
      : defaultSubmissionSetting;
  }, [assignment]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      generalSettingForm: initGeneralSetting,
      availabilitySettingForm: initAvailabilitySetting,
      submissionSettingForm: initSubmissionSetting,
    },
  });
  const { setValue, watch } = form;
  const { errors } = form.formState;

  //use for auto save setting and update the state when the show content is closed
  const handleGeneralSettingChange = useDebounceFunction(
    (data: GeneralSettingForm) => setValue("generalSettingForm", data)
  );

  const handleAvailabilitySettingChange = useDebounceFunction(
    (data: AvailabilitySettingForm) => setValue("availabilitySettingForm", data)
  );

  const handleSubmissionSettingChange = useDebounceFunction(
    (data: SubmissionSettingForm) => setValue("submissionSettingForm", data)
  );

  const handleGetAssignmentToUpdate = (form: AssignmentSettingForm) => {
    const {
      generalSettingForm,
      availabilitySettingForm,
      submissionSettingForm,
    } = form;
    const { title, description } = generalSettingForm;
    const { open, close, remindToGrade } = availabilitySettingForm;
    const { maximumFile, maximumFileSize } = submissionSettingForm;
    const assignmentToUpdate: AssignmentTopic = {
      ...assignment,
      title,
      data: {
        ...assignment.data,
        description,
        open: open.enabled ? open.value : null,
        close: close.enabled ? close.value : null,
        remindToGrade: remindToGrade.enabled ? remindToGrade.value : null,
        maximumFile: maximumFile.enabled ? maximumFile.value : null,
        maximumFileSize: maximumFileSize.enabled ? maximumFileSize.value : null,
      },
    };

    return assignmentToUpdate;
  };

  const compareAssignment = (
    assignment1: AssignmentTopic,
    assignment2: AssignmentTopic
  ) => {
    const assignment1JSON = JSON.stringify(assignment1);
    const assignment2JSON = JSON.stringify(assignment2);
    return assignment1JSON === assignment2JSON;
  };

  const onSubmit = (data: AssignmentSettingForm) => {
    const assignmentToSubmit = handleGetAssignmentToUpdate(data);
    if (!isSettingChange) {
      toast.info("No changes to submit");
      return;
    }
    if (onSubmitAssignmentSetting)
      onSubmitAssignmentSetting(assignmentToSubmit);
  };

  const titles = ["General", "Availability", "Submission"];
  const isSettingChange = useMemo(() => {
    return !compareAssignment(
      assignment,
      handleGetAssignmentToUpdate(form.getValues())
    );
  }, [assignment, form.getValues()]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CollapsibleList titles={titles}>
          <GeneralSetting
            formData={watch("generalSettingForm")}
            onChange={handleGeneralSettingChange}
          />
          <AvailabilitySetting
            formData={watch("availabilitySettingForm")}
            onChange={handleAvailabilitySettingChange}
          />
          {/* <SubmissionSetting
            formData={watch("submissionSettingForm")}
            onChange={handleSubmissionSettingChange}
          /> */}
        </CollapsibleList>
        <div className="w-full flex flex-row justify-center">
          <Button
            type="submit"
            disabled={!isSettingChange}
            onClick={() => {
              console.log("error", errors);
            }}
            variant="default"
          >
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SettingList;
