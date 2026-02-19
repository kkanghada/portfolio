import React, { useState } from 'react';
import { Plus, Trash2, Calendar } from 'lucide-react';

export default function ExpenseManager() {
  const [expenses, setExpenses] = useState([
    { id: 1, date: '2026-02-09', category: '식비', amount: 45000, type: 'expense', memo: '점심 회식', checked: false },
    { id: 2, date: '2026-02-08', category: '교통비', amount: 15000, type: 'expense', memo: '택시', checked: false },
    { id: 3, date: '2026-02-07', category: '급여', amount: 3000000, type: 'income', memo: '월급', checked: false },
    { id: 4, date: '2026-02-06', category: '쇼핑', amount: 120000, type: 'expense', memo: '의류 구매', checked: false },
    { id: 5, date: '2026-02-05', category: '식비', amount: 32000, type: 'expense', memo: '저녁 식사', checked: false },
    { id: 6, date: '2026-02-04', category: '문화생활', amount: 18000, type: 'expense', memo: '영화 관람', checked: false },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    category: '',
    amount: '',
    type: 'expense',
    memo: ''
  });

  const totalIncome = expenses
    .filter(e => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0);
  
  const totalExpense = expenses
    .filter(e => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0);

  const balance = totalIncome - totalExpense;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: expenses.length + 1,
      ...formData,
      amount: parseInt(formData.amount),
      checked: false
    };
    setExpenses([newExpense, ...expenses]);
    setFormData({ date: '', category: '', amount: '', type: 'expense', memo: '' });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const toggleCheck = (id) => {
    setExpenses(expenses.map(e => 
      e.id === id ? { ...e, checked: !e.checked } : e
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">비용 관리 시스템</h1>
            <p className="text-gray-500 mt-1">수입 및 지출 내역 관리</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowDateModal(true)}
              className="bg-gray-600 hover:bg-gray-500 text-white px-5 py-2.5 rounded flex items-center gap-2 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              등록일자관리
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              새 항목
            </button>
          </div>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-gray-300 rounded p-5">
            <div className="text-sm text-gray-500 mb-1">총 수입</div>
            <div className="text-2xl font-bold text-gray-800">
              {totalIncome.toLocaleString()}원
            </div>
          </div>
          <div className="bg-white border border-gray-300 rounded p-5">
            <div className="text-sm text-gray-500 mb-1">총 지출</div>
            <div className="text-2xl font-bold text-gray-800">
              {totalExpense.toLocaleString()}원
            </div>
          </div>
          <div className="bg-white border border-gray-300 rounded p-5">
            <div className="text-sm text-gray-500 mb-1">잔액</div>
            <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {balance.toLocaleString()}원
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-300 rounded overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 border-b border-gray-300">
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 w-12">
                  <input type="checkbox" className="w-4 h-4" />
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">날짜</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">구분</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">카테고리</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">메모</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">금액</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">삭제</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr 
                  key={expense.id} 
                  className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 text-center">
                    <input 
                      type="checkbox" 
                      checked={expense.checked}
                      onChange={() => toggleCheck(expense.id)}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{expense.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded text-xs font-medium ${
                      expense.type === 'income' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {expense.type === 'income' ? '수입' : '지출'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{expense.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{expense.memo}</td>
                  <td className={`px-6 py-4 text-sm font-bold text-right ${
                    expense.type === 'income' ? 'text-green-600' : 'text-gray-800'
                  }`}>
                    {expense.type === 'income' ? '+' : '-'}{expense.amount.toLocaleString()}원
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Row */}
          <div className="bg-gray-100 border-t-2 border-gray-400 px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="text-sm font-semibold text-gray-700">
                총 {expenses.length}개 항목
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-600 mr-4">
                  수입: <span className="font-bold text-green-600">{totalIncome.toLocaleString()}원</span>
                </span>
                <span className="text-sm text-gray-600 mr-4">
                  지출: <span className="font-bold text-gray-800">{totalExpense.toLocaleString()}원</span>
                </span>
                <span className="text-sm text-gray-600">
                  잔액: <span className={`font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {balance.toLocaleString()}원
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded shadow-xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">새 항목 추가</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-sm">날짜</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-sm">유형</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                      <option value="expense">지출</option>
                      <option value="income">수입</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-sm">카테고리</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                      placeholder="예: 식비, 교통비, 급여 등"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-sm">금액</label>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                      placeholder="금액 입력"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-sm">메모</label>
                    <input
                      type="text"
                      value={formData.memo}
                      onChange={(e) => setFormData({...formData, memo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                      placeholder="메모 (선택사항)"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                  >
                    추가
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Date Management Modal */}
        {showDateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded shadow-xl max-w-lg w-full p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">등록일자 관리</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 border border-gray-300 rounded p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2 text-sm">시작일</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2 text-sm">종료일</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-300 rounded p-4">
                  <h3 className="font-medium text-gray-700 mb-3">빠른 선택</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm">
                      오늘
                    </button>
                    <button className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm">
                      이번 주
                    </button>
                    <button className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm">
                      이번 달
                    </button>
                    <button className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm">
                      지난 주
                    </button>
                    <button className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm">
                      지난 달
                    </button>
                    <button className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-sm">
                      전체
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowDateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={() => setShowDateModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  적용
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
