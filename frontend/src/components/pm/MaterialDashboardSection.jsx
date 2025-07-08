import React, { useState, useEffect } from 'react';

// Sample data - in a real app, this would come from props, context, or API call
// Also, project names would ideally be resolved from a projects list/context
const initialMaterials = [
    { id: 'mat001', name: 'Cement Bags (50kg)', projectId: 'proj001', projectName: 'Road Renovation - Phase 1', allocated: 200, used: 85, unit: 'Bags' },
    { id: 'mat002', name: 'Iron Rods (12mm)', projectId: 'proj002', projectName: 'School Building Construction', allocated: 5, used: 4.8, unit: 'Tons' },
    { id: 'mat003', name: 'Paint (White Emulsion)', projectId: 'proj003', projectName: 'Warehouse Extension', allocated: 50, used: 0, unit: 'Gallons' },
    { id: 'mat004', name: 'Sand (Cubic Meters)', projectId: 'proj001', projectName: 'Road Renovation - Phase 1', allocated: 50, used: 20, unit: 'm³' },
];


function MaterialDashboardSection() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    // Simulate fetching materials data
    // In a real app, you might also fetch project names if not embedded
    setMaterials(initialMaterials);
  }, []);

  const handleMaterialAction = (materialId, action) => {
    const material = materials.find(m => m.id === materialId);
    if (!material) {
      alert("Material not found.");
      return;
    }

    if (action === 'adjust') {
      const newUsedStr = prompt(`Adjust used quantity for ${material.name} (Allocated: ${material.allocated} ${material.unit || ''}). Current used: ${material.used}. New used quantity:`, material.used);
      if (newUsedStr !== null) {
        const newUsed = parseFloat(newUsedStr);
        if (!isNaN(newUsed) && newUsed >= 0 && newUsed <= material.allocated) {
          setMaterials(prevMaterials =>
            prevMaterials.map(m =>
              m.id === materialId ? { ...m, used: newUsed } : m
            )
          );
          alert(`${material.name} usage updated to ${newUsed} ${material.unit || ''}.`);
        } else {
          alert("Invalid quantity entered or exceeds allocation.");
        }
      }
    } else if (action === 'request') {
      alert(`Simulating: Requesting more ${material.name} for project ${material.projectName}.`);
    } else if (action === 'viewDetails') {
       alert(`Details for ${material.name}:\nProject: ${material.projectName}\nAllocated: ${material.allocated} ${material.unit || ''}\nUsed: ${material.used} ${material.unit || ''}`);
    }
  };


  return (
    <section id="material-dashboard-react" className="mb-12 p-6 bg-white rounded-lg shadow-lg print:shadow-none">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Material Dashboard</h2>
      {materials.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No materials data available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material Name</th>
                <th className="py-3 px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th className="py-3 px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allocated</th>
                <th className="py-3 px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Used</th>
                <th className="py-3 px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider print:hidden">Status</th>
                <th className="py-3 px-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider print:hidden">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {materials.map(material => {
                const usagePercentage = material.allocated > 0 ? (material.used / material.allocated) * 100 : 0;
                let progressBarColor = 'bg-blue-600';
                if (usagePercentage >= 90) progressBarColor = 'bg-red-500';
                else if (usagePercentage >= 60) progressBarColor = 'bg-yellow-500';
                else if (usagePercentage > 0) progressBarColor = 'bg-green-600';

                return (
                  <tr key={material.id} data-material-id={material.id}>
                    <td className="py-4 px-5 whitespace-nowrap text-sm font-medium text-gray-900">{material.name}</td>
                    <td className="py-4 px-5 whitespace-nowrap text-sm text-gray-500 truncate" title={material.projectName}>{material.projectName}</td>
                    <td className="py-4 px-5 whitespace-nowrap text-sm text-gray-500">{material.allocated} {material.unit || ''}</td>
                    <td className="py-4 px-5 whitespace-nowrap text-sm text-gray-500">{material.used} {material.unit || ''}</td>
                    <td className="py-4 px-5 whitespace-nowrap print:hidden">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className={`${progressBarColor} h-2.5 rounded-full`} style={{ width: `${usagePercentage.toFixed(1)}%` }}></div>
                      </div>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap text-sm space-x-2 print:hidden">
                      <button
                        onClick={() => handleMaterialAction(material.id, 'adjust')}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Adjust
                      </button>
                      <button
                        onClick={() => handleMaterialAction(material.id, 'request')}
                        className="text-green-600 hover:text-green-800"
                      >
                        Request More
                      </button>
                       <button
                        onClick={() => handleMaterialAction(material.id, 'viewDetails')}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default MaterialDashboardSection;
