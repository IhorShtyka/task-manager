import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TaskCard } from "../components/TaskCard";
import { EmptySlot } from "../components/EmptySlot";
import { InlineForm } from "../components/InlineForm";

describe("TaskCard", () => {
  it("renders title and status badge", () => {
    render(
      <TaskCard title="Standup" status="active" onEdit={() => {}} onDelete={() => {}} />
    );
    expect(screen.getByText("Standup")).toBeInTheDocument();
    expect(screen.getByText("active")).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    const onEdit = vi.fn();
    render(
      <TaskCard title="Standup" status="pending" onEdit={onEdit} onDelete={() => {}} />
    );
    fireEvent.click(screen.getByLabelText("Edit task"));
    expect(onEdit).toHaveBeenCalledOnce();
  });

  it("calls onDelete when delete button is clicked", () => {
    const onDelete = vi.fn();
    render(
      <TaskCard title="Standup" status="pending" onEdit={() => {}} onDelete={onDelete} />
    );
    fireEvent.click(screen.getByLabelText("Delete task"));
    expect(onDelete).toHaveBeenCalledOnce();
  });

  it("shows strikethrough for done tasks", () => {
    render(
      <TaskCard title="Done task" status="done" onEdit={() => {}} onDelete={() => {}} />
    );
    const title = screen.getByText("Done task");
    expect(title.style.textDecoration).toBe("line-through");
  });

  it("shows statusLabel in badge when provided", () => {
    render(
      <TaskCard title="Active" status="active" statusLabel="in progress" onEdit={() => {}} onDelete={() => {}} />
    );
    expect(screen.getByText("in progress")).toBeInTheDocument();
  });
});

describe("EmptySlot", () => {
  it("renders placeholder text", () => {
    render(<EmptySlot onClick={() => {}} />);
    expect(screen.getByText("+ Click to add task")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<EmptySlot onClick={onClick} />);
    fireEvent.click(screen.getByText("+ Click to add task"));
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe("InlineForm", () => {
  it("renders with empty input for create mode", () => {
    render(<InlineForm onSave={() => {}} onCancel={() => {}} />);
    const input = screen.getByPlaceholderText("Task title...");
    expect(input).toHaveValue("");
    expect(screen.getByText("New task")).toBeInTheDocument();
  });

  it("renders with pre-filled input for edit mode", () => {
    render(<InlineForm initialTitle="Standup" onSave={() => {}} onCancel={() => {}} />);
    const input = screen.getByPlaceholderText("Task title...");
    expect(input).toHaveValue("Standup");
    expect(screen.getByText("Edit task")).toBeInTheDocument();
  });

  it("calls onSave with trimmed title on submit", () => {
    const onSave = vi.fn();
    render(<InlineForm onSave={onSave} onCancel={() => {}} />);
    const input = screen.getByPlaceholderText("Task title...");
    fireEvent.change(input, { target: { value: "  New task  " } });
    fireEvent.click(screen.getByText("Save"));
    expect(onSave).toHaveBeenCalledWith("New task");
  });

  it("does not call onSave with empty title", () => {
    const onSave = vi.fn();
    render(<InlineForm onSave={onSave} onCancel={() => {}} />);
    fireEvent.click(screen.getByText("Save"));
    expect(onSave).not.toHaveBeenCalled();
  });

  it("calls onCancel when cancel button is clicked", () => {
    const onCancel = vi.fn();
    render(<InlineForm onSave={() => {}} onCancel={onCancel} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalledOnce();
  });
});
