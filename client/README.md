# Functional Requirements

## 1. Dashboard

The Dashboard is the landing page after a user signs in.

### Features

- Display all available **Templates**.
- Display all **Workspaces** that belong to or are shared with the current user.
- Allow users to create a new **Workspace**.

---

## 2. Workspace

A Workspace is a container that organizes multiple boards and members.

### Workspace List

Users can:

- View all workspaces.
- Create a new workspace.

### Workspace Information

Each workspace contains:

- Title
- Description
- Visibility
  - Private
  - Public (optional)

### Workspace Detail

Display:

- Workspace information
  - Title
  - Description
  - Visibility
- List of boards in the workspace

#### Navigation

##### Boards

- View all boards in the workspace.

##### Members

- View workspace members.
- Invite members.
- Remove members (Owner/Admin only).

##### Settings

- Edit workspace information.
- Change workspace visibility.
- Delete workspace.

---

## 3. Templates

Templates are reusable board structures.

### Features

Users can:

- View template list.
- Create a template.
- Edit a template.
- Delete a template.
- Use a template when creating a board.

### Template Structure

A template may contain:

- Board information
- Columns
- Cards (optional)

---

## 4. Boards

A board belongs to exactly one workspace.

Users can create a board in two ways:

- Simple Board
- Board from Template

---

### 4.1 Create Simple Board

Fields:

- Title
- Workspace
- Background
  - Background color
  - Background image
- Visibility
  - Private
  - Workspace
  - Public

#### Visibility

| Visibility | Description |
|------------|-------------|
| Private | Only board members can access the board. |
| Workspace | All members of the workspace can access the board. |
| Public | Anyone can view the board. |

---

### 4.2 Create Board from Template

Fields:

- Template
- Title
- Workspace
- Background
  - Background color
  - Background image
- Visibility
  - Private
  - Workspace
  - Public

#### Keep Cards Option

| Option | Description |
|--------|-------------|
| Keep cards | Copy all cards from the selected template. |
| Don't keep cards | Copy only the column structure. |

---

## 5. Board Detail

The Board Detail page is the primary workspace for task management.

### Display

Board information:

- Title
- Background
- Visibility
- Workspace

Board content:

- Columns
- Cards

Additional information:

- Board members
- Activity log

### Settings

Users can:

- Edit board
- Delete board
- Change visibility

---

## 6. Columns

A board contains multiple columns.

### Features

#### Create Column

Fields:

- Title

#### Edit Column

- Update title.

#### Delete Column

- Remove the column.

> Business rule: Existing cards should either be moved to another column or deleted based on application rules.

#### Reorder Columns

- Drag and drop columns.

---

## 7. Cards

A column contains multiple cards.

### Create Card

Fields:

- Title
- Description
- Due date
- Members
- Labels
- Attachments

### Card Actions

Users can:

- View card details.
- Edit card.
- Delete card.
- Move card to another column.
- Reorder cards within a column using drag-and-drop.

---

## 8. User Permissions

### Workspace

Owners/Admins can:

- Edit workspace.
- Delete workspace.
- Invite members.
- Remove members.

Members can:

- View workspace.
- Access boards according to permissions.

---

### Board

Board members can:

- View board.
- Create columns.
- Create cards.
- Edit cards.
- Move cards.

Board admins can additionally:

- Edit board settings.
- Delete board.
- Manage board members.

---

## 9. Data Relationships

```text
User
├── Workspaces
│   ├── Members
│   ├── Boards
│   │   ├── Columns
│   │   │   └── Cards
│   │   ├── Members
│   │   ├── Activity Logs
│   │   └── Settings
│   └── Templates
│       ├── Columns
│       └── Cards (optional)
```

---

## 10. Entity Relationship

```text
User
 │
 ├── Workspace (1:N)
 │      │
 │      ├── Members (N:M User)
 │      ├── Boards (1:N)
 │      └── Templates (1:N)
 │
 ├── Board
 │      │
 │      ├── Columns (1:N)
 │      │      └── Cards (1:N)
 │      │
 │      ├── Members (N:M User)
 │      └── Activity Logs (1:N)
 │
 └── Card
        ├── Labels (N:M)
        ├── Members (N:M User)
        ├── Attachments (1:N)
        └── Due Date
```