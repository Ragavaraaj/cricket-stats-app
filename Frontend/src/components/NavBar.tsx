interface NavBarProps {
  changeTable: (val: number) => void;
}

export const NavBar = ({ changeTable }: NavBarProps) => {
  return (
    <nav className="flex items-center">
      <h1 className="px-10 py-2 font-extrabold text-lg">Cricket Scores</h1>
      <button
        className="p-2 mr-5 font-bold uppercase tracking-wider"
        onClick={() => changeTable(0)}
      >
        teams
      </button>
      <button
        className="p-2 font-bold uppercase tracking-wider"
        onClick={() => changeTable(1)}
      >
        players
      </button>
    </nav>
  );
};
