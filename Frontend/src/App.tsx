import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavBar } from './components/NavBar';
import { PlayersTable, TeamsTable } from './Table';

const queryClient = new QueryClient();

function App() {
  const [tableID, setTableID] = useState(0);

  const renderTable = () => {
    switch (tableID) {
      case 0:
        return <TeamsTable />;
      case 1:
        return <PlayersTable />;
      default:
        return <></>;
    }
  };

  const handleTableChange = (val: number) => {
    setTableID(val);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col font-mono">
        <NavBar changeTable={handleTableChange} />
        {renderTable()}
      </div>
    </QueryClientProvider>
  );
}

export default App;
