import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUsers, 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiCheck, 
  FiX, 
  FiClock,
  FiEye,
  FiFilter,
  FiSearch,
  FiUserPlus,
  FiMail,
  FiKey,
  FiToggleLeft,
  FiToggleRight
} from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import {
  getAllStaff,
  createStaffAccount,
  updateStaffAccount,
  deleteStaffAccount,
  batchDeleteStaffAccounts,
  getAllProfiles,
  reviewProfile
} from '../utils/api';

const StyledStaffAdmin = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(224, 43, 32, 0.03) 0%, rgba(252, 185, 0, 0.05) 100%);
  padding-top: 5rem;
  
  [data-theme="dark"] & {
    background: linear-gradient(135deg, rgba(224, 43, 32, 0.08) 0%, rgba(252, 185, 0, 0.08) 100%);
  }
  
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    
    @media (max-width: 768px) {
      padding: 1rem;
    }
  }
  
  .page-header {
    text-align: center;
    margin-bottom: 3rem;
    
    @media (max-width: 768px) {
      margin-bottom: 2rem;
    }
    
    h1 {
      font-size: clamp(2.5rem, 5vw, 3.5rem);
      margin-bottom: 1rem;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      
      @media (max-width: 768px) {
        font-size: clamp(2rem, 6vw, 2.5rem);
      }
    }
    
    p {
      color: var(--text-light);
      font-size: 1.1rem;
      max-width: 600px;
      margin: 0 auto;
      
      @media (max-width: 768px) {
        font-size: 1rem;
        padding: 0 1rem;
      }
    }
  }
  
  .tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid #e5e7eb;
    
    [data-theme="dark"] & {
      border-bottom-color: var(--border);
    }
    
    @media (max-width: 768px) {
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    
    .tab {
      padding: 1rem 2rem;
      border: none;
      background: none;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      font-weight: 500;
      color: var(--text-light);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      @media (max-width: 768px) {
        padding: 0.75rem 1rem;
        font-size: 0.9rem;
        flex: 1;
        justify-content: center;
      }
      
      &.active {
        color: var(--primary);
        
        &:after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--primary);
        }
      }
      
      &:hover {
        color: var(--primary);
      }
    }
  }
  
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .search-filter {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex: 1;
      
      @media (max-width: 768px) {
        flex-direction: column;
        gap: 0.75rem;
        align-items: stretch;
      }
      
      .search-box {
        position: relative;
        max-width: 300px;
        
        @media (max-width: 768px) {
          max-width: none;
        }
        
        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-light);
        }
        
        input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          background: white;
          color: var(--text);
          transition: all 0.3s ease;
          
          [data-theme="dark"] & {
            background: var(--input-bg);
            border-color: var(--border);
            color: var(--text);
            
            &:focus {
              background: var(--card-bg);
              border-color: var(--primary);
            }
          }
          
          &:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(224, 43, 32, 0.1);
          }
        }
      }
      
      .filter-select {
        padding: 0.75rem 1rem;
        border: 2px solid #e5e7eb;
        border-radius: 10px;
        background: white;
        color: var(--text);
        cursor: pointer;
        transition: all 0.3s ease;
        
        [data-theme="dark"] & {
          background: var(--input-bg);
          border-color: var(--border);
          color: var(--text);
          
          &:focus {
            background: var(--card-bg);
            border-color: var(--primary);
          }
        }
        
        @media (max-width: 768px) {
          width: 100%;
        }
        
        &:focus {
          outline: none;
          border-color: var(--primary);
        }
      }
    }
    
    .action-button {
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
      
      @media (max-width: 768px) {
        justify-content: center;
        padding: 1rem 1.5rem;
      }
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(224, 43, 32, 0.3);
      }
    }
  }
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(224, 43, 32, 0.1);
  transition: all 0.3s ease;
  
  [data-theme="dark"] & {
    background: var(--card-bg);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    border-color: var(--border);
    
    &:hover {
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    }
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 12px;
  }
  
  &:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }
    
    .info {
      flex: 1;
      
      h3 {
        color: var(--text);
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
        
        @media (max-width: 768px) {
          font-size: 1.1rem;
        }
      }
      
      .meta {
        display: flex;
        gap: 1rem;
        color: var(--text-light);
        font-size: 0.9rem;
        flex-wrap: wrap;
        
        @media (max-width: 768px) {
          gap: 0.75rem;
          font-size: 0.85rem;
        }
        
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
      }
    }
    
    .actions {
      display: flex;
      gap: 0.5rem;
      
      @media (max-width: 768px) {
        flex-wrap: wrap;
        gap: 0.4rem;
        width: 100%;
        justify-content: center;
      }
      
      .action-btn {
        width: auto;
        min-width: 35px;
        height: 35px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        padding: 0.5rem 0.75rem;
        font-size: 0.8rem;
        font-weight: 500;
        transition: all 0.3s ease;
        white-space: nowrap;
        
        @media (max-width: 768px) {
          font-size: 0.75rem;
          padding: 0.4rem 0.6rem;
          min-width: 32px;
          height: 32px;
        }
        
        &.view {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          
          &:hover {
            background: #3b82f6;
            color: white;
          }
        }
        
        &.edit {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
          
          &:hover {
            background: #f59e0b;
            color: white;
          }
        }
        
        &.approve {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          
          &:hover {
            background: #10b981;
            color: white;
          }
        }
        
        &.reject {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          
          &:hover {
            background: #ef4444;
            color: white;
          }
        }
        
        &.delete {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          
          &:hover {
            background: #ef4444;
            color: white;
          }
        }
        
        &.secondary {
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
          
          &:hover {
            background: #6b7280;
            color: white;
          }
        }
        
        &.toggle {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
          
          &:hover {
            background: #d97706;
            color: white;
          }
        }
      }
    }
  }
  
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    
    &.approved {
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
    }
    
    &.pending {
      background: rgba(245, 158, 11, 0.1);
      color: #f59e0b;
    }
    
    &.rejected {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }
    
    &.active {
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
    }
    
    &.inactive {
      background: rgba(156, 163, 175, 0.1);
      color: #9ca3af;
    }
  }
  
  &.selectable {
    cursor: pointer;
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 1rem;
  
  .modal-content {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    width: 100%;
    max-width: ${props => props.isReviewModal ? '900px' : '500px'};
    max-height: 90vh;
    overflow-y: auto;
    
    [data-theme="dark"] & {
      background: var(--card-bg);
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      
      h3 {
        color: var(--text);
        margin: 0;
      }
      
      .close-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-light);
        
        &:hover {
          color: var(--primary);
        }
      }
    }
    
    .form-group {
      margin-bottom: 1.5rem;
      
      label {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--text);
        font-weight: 500;
      }
      
      input, select, textarea {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid #e5e7eb;
        border-radius: 10px;
        font-size: 1rem;
        background: white;
        color: var(--text);
        transition: all 0.3s ease;
        
        [data-theme="dark"] & {
          background: var(--input-bg);
          border-color: var(--border);
          color: var(--text);
          
          &:focus {
            background: var(--card-bg);
            border-color: var(--primary);
          }
        }
        
        &:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(224, 43, 32, 0.1);
        }
      }
      
      // 复选框特殊样式
      &.checkbox-group {
        label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0;
          cursor: pointer;
          
          input[type="checkbox"] {
            width: auto;
            margin: 0;
            cursor: pointer;
          }
        }
      }
      
      textarea {
        min-height: 100px;
        resize: vertical;
      }
    }
    
    /* Review modal specific styles */
    .profile-review-section {
      .info-item {
        margin-bottom: 0.75rem;
        
        strong {
          color: var(--text);
          font-size: 0.9rem;
        }
        
        div {
          font-size: 0.95rem;
          line-height: 1.4;
        }
      }
    }
    
    .review-controls-section {
      h4 {
        font-size: 1.1rem;
        font-weight: 600;
      }
    }
    
    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      
      .btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
        
        &.primary {
          background: linear-gradient(135deg, var(--primary), var(--accent));
          color: white;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(224, 43, 32, 0.3);
          }
        }
        
        &.secondary {
          background: #f3f4f6;
          color: var(--text);
          
          [data-theme="dark"] & {
            background: var(--input-bg);
            color: var(--text);
            
            &:hover {
              background: var(--border);
            }
          }
          
          &:hover {
            background: #e5e7eb;
          }
        }
      }
    }
  }
`;

const StaffAdmin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  
  const [activeTab, setActiveTab] = useState('accounts');
  const [staffAccounts, setStaffAccounts] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // create, edit, review
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isActive: true,
    role: 'staff'
  });

  // Redirect if no staff management permissions
  useEffect(() => {
    if (!hasPermission('manageStaff') && !hasPermission('reviewProfiles')) {
      navigate('/');
    }
  }, [hasPermission, navigate]);

  // Load data
  useEffect(() => {
    if (hasPermission('manageStaff') || hasPermission('reviewProfiles')) {
      loadData();
    }
  }, [hasPermission, activeTab]);

  // Filter data
  useEffect(() => {
    filterData();
  }, [staffAccounts, profiles, searchTerm, statusFilter, activeTab]);

  // Set default tab based on permissions
  useEffect(() => {
    if (!hasPermission('manageStaff') && hasPermission('reviewProfiles')) {
      setActiveTab('profiles');
    }
  }, [hasPermission]);

  // Reset status filter when switching tabs
  useEffect(() => {
    if (activeTab === 'profiles') {
      setStatusFilter('all'); // This will trigger backend to show only pending and rejected
    } else {
      setStatusFilter('all');
    }
  }, [activeTab]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'accounts') {
        const data = await getAllStaff();
        setStaffAccounts(data);
      } else {
        const data = await getAllProfiles(statusFilter === 'all' ? '' : statusFilter);
        setProfiles(data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterData = () => {
    const data = activeTab === 'accounts' ? staffAccounts : profiles;
    
    let filtered = data.filter(item => {
      const searchMatch = activeTab === 'accounts' 
        ? (item.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.email?.toLowerCase().includes(searchTerm.toLowerCase()))
        : (item.name_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.name_zh?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.staff?.username?.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const statusMatch = statusFilter === 'all' || 
        (activeTab === 'accounts' 
          ? (statusFilter === 'active' ? item.isActive : !item.isActive)
          : item.status === statusFilter);
      
      return searchMatch && statusMatch;
    });
    
    setFilteredData(filtered);
  };

  const handleCreateStaff = () => {
    setModalType('create');
    setSelectedItem(null);
    setFormData({
      username: '',
      email: '',
      password: '',
      isActive: true,
      role: 'staff',
      canManageEvents: false,
      canManageStaff: false,
      canReviewProfiles: false
    });
    setShowModal(true);
  };

  const handleEditStaff = (staff) => {
    setModalType('edit');
    setSelectedItem(staff);
    setFormData({
      username: staff.username,
      email: staff.email,
      password: '',
      isActive: staff.isActive,
      role: staff.role,
      canManageEvents: staff.canManageEvents || false,
      canManageStaff: staff.canManageStaff || false,
      canReviewProfiles: staff.canReviewProfiles || false
    });
    setShowModal(true);
  };

  const handleReviewProfile = (profile) => {
    setModalType('review');
    setSelectedItem(profile);
    setFormData({
      status: profile.status,
      reviewNote: profile.reviewNote || '',
      displayOrder: profile.displayOrder || 0
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (modalType === 'create') {
        // Structure permissions data for creation
        const createData = {
          ...formData,
          permissions: {
            canManageEvents: formData.canManageEvents,
            canManageStaff: formData.canManageStaff,
            canReviewProfiles: formData.canReviewProfiles
          }
        };
        delete createData.canManageEvents;
        delete createData.canManageStaff;
        delete createData.canReviewProfiles;
        
        await createStaffAccount(createData);
      } else if (modalType === 'edit') {
        const { password, ...updateData } = formData;
        // Structure permissions data
        const permissionsData = {
          ...updateData,
          permissions: {
            canManageEvents: updateData.canManageEvents,
            canManageStaff: updateData.canManageStaff,
            canReviewProfiles: updateData.canReviewProfiles
          }
        };
        delete permissionsData.canManageEvents;
        delete permissionsData.canManageStaff;
        delete permissionsData.canReviewProfiles;
        
        await updateStaffAccount(selectedItem.id, permissionsData);
      } else if (modalType === 'review') {
        await reviewProfile(selectedItem.id, formData);
      }
      
      setShowModal(false);
      loadData();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error
    }
  };

  const handleDeleteStaff = async (id) => {
    if (window.confirm('Are you sure you want to delete this staff account?')) {
      try {
        await deleteStaffAccount(id);
        loadData();
      } catch (error) {
        console.error('Error deleting staff:', error);
      }
    }
  };

  const handleQuickReview = async (profileId, status) => {
    try {
      await reviewProfile(profileId, { status });
      loadData();
    } catch (error) {
      console.error('Error reviewing profile:', error);
    }
  };

  const handleResetPassword = async (staff) => {
    const newPassword = prompt(`Generate new password for ${staff.username}?\n\nEnter new password or leave blank to auto-generate:`);
    if (newPassword !== null) {
      try {
        const passwordToUse = newPassword.trim() || Math.random().toString(36).slice(-8);
        await updateStaffAccount(staff.id, { 
          password: passwordToUse,
          permissions: {} // Keep existing permissions
        });
        alert(`Password reset successfully!\nNew password: ${passwordToUse}\n\nPlease share this with the user securely.`);
        loadData();
      } catch (error) {
        console.error('Error resetting password:', error);
        alert('Failed to reset password');
      }
    }
  };

  const handleToggleAccount = async (staff) => {
    const action = staff.isActive ? 'deactivate' : 'activate';
    if (window.confirm(`Are you sure you want to ${action} ${staff.username}'s account?`)) {
      try {
        await updateStaffAccount(staff.id, { 
          isActive: !staff.isActive,
          permissions: {} // Keep existing permissions
        });
        loadData();
      } catch (error) {
        console.error(`Error ${action}ing account:`, error);
        alert(`Failed to ${action} account`);
      }
    }
  };

  // 批量选择相关函数
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
    } else {
      const allIds = new Set(filteredData.map(item => item.id));
      setSelectedItems(allIds);
    }
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
    setSelectAll(newSelected.size === filteredData.length);
  };

  const handleBatchDelete = async () => {
    if (selectedItems.size === 0) {
      alert(t('admin.staff.batchDelete.noSelection'));
      return;
    }

    const confirmMessage = t('admin.staff.batchDelete.confirm', { count: selectedItems.size });
    if (window.confirm(confirmMessage)) {
      try {
        const idsArray = Array.from(selectedItems);
        await batchDeleteStaffAccounts(idsArray);
        setSelectedItems(new Set());
        setSelectAll(false);
        loadData();
        alert(t('admin.staff.batchDelete.success', { count: selectedItems.size }));
      } catch (error) {
        console.error('Error batch deleting staff:', error);
        alert(t('admin.staff.batchDelete.error'));
      }
    }
  };

  // 重置选择状态当数据变化时
  useEffect(() => {
    setSelectedItems(new Set());
    setSelectAll(false);
  }, [filteredData]);

  if (!hasPermission('manageStaff') && !hasPermission('reviewProfiles')) {
    return null;
  }

  return (
    <StyledStaffAdmin>
      <div className="container">
        <div className="page-header">
          <h1>{t('admin.staff.managementTitle')}</h1>
          <p>{t('admin.staff.managementSubtitle')}</p>
        </div>

        <div className="tabs">
          {hasPermission('manageStaff') && (
            <button 
              className={`tab ${activeTab === 'accounts' ? 'active' : ''}`}
              onClick={() => setActiveTab('accounts')}
            >
              <FiUsers />
              {t('admin.staff.tabs.accounts')}
            </button>
          )}
          {hasPermission('reviewProfiles') && (
            <button
              className={`tab ${activeTab === 'profiles' ? 'active' : ''}`}
              onClick={() => setActiveTab('profiles')}
            >
              <FiClock />
              {t('admin.staff.tabs.profiles')}
            </button>
          )}
        </div>

        <div className="controls">
          <div className="search-filter">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder={t('admin.staff.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select 
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">{t('admin.staff.filters.all')}</option>
              {activeTab === 'accounts' ? (
                <>
                  <option value="active">{t('admin.staff.filters.active')}</option>
                  <option value="inactive">{t('admin.staff.filters.inactive')}</option>
                </>
              ) : (
                <>
                  <option value="pending">{t('admin.staff.filters.pending')}</option>
                  <option value="rejected">{t('admin.staff.filters.rejected')}</option>
                </>
              )}
            </select>
          </div>
          
          {activeTab === 'accounts' && hasPermission('manageStaff') && (
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              {selectedItems.size > 0 && (
                <button 
                  className="action-button danger"
                  onClick={handleBatchDelete}
                  style={{ 
                    background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                    color: 'white',
                    minWidth: 'fit-content'
                  }}
                >
                  <FiTrash2 />
                  <span style={{ whiteSpace: 'nowrap' }}>
                    {t('admin.staff.batchDelete.button')} ({selectedItems.size})
                  </span>
                </button>
              )}
              <button className="action-button" onClick={handleCreateStaff}>
                <FiUserPlus />
                {t('admin.staff.createAccount')}
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div className="loading-spinner" />
            <p>{t('common.loading')}</p>
          </div>
        ) : filteredData.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ 
              textAlign: 'center', 
              padding: '4rem 2rem',
              background: 'var(--card-bg)',
              borderRadius: '15px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
              border: '1px solid var(--border)'
            }}>
            <div style={{ 
              fontSize: '3rem', 
              marginBottom: '1rem',
              opacity: 0.5
            }}>
              {activeTab === 'accounts' ? '👥' : '📋'}
            </div>
            <h3 style={{ 
              margin: '0 0 0.5rem 0',
              color: 'var(--text)',
              fontSize: '1.5rem'
            }}>
              {activeTab === 'accounts' 
                ? t('admin.staff.emptyStates.noAccounts')
                : t('admin.staff.emptyStates.noProfiles')
              }
            </h3>
            <p style={{ 
              color: 'var(--text-light)',
              fontSize: '1rem',
              margin: '0',
              maxWidth: '400px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              {activeTab === 'accounts' 
                ? t('admin.staff.emptyStates.noAccountsDesc')
                : t('admin.staff.emptyStates.noProfilesDesc')
              }
            </p>
            {activeTab === 'accounts' && hasPermission('manageStaff') && (
              <button 
                className="action-button" 
                onClick={handleCreateStaff}
                style={{ 
                  marginTop: '2rem',
                  background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: '500'
                }}
              >
                <FiUserPlus />
                {t('admin.staff.createAccount')}
              </button>
            )}
          </motion.div>
        ) : (
          <div className="data-list">
            {activeTab === 'accounts' && hasPermission('manageStaff') && filteredData.length > 0 && (
              <div style={{ 
                padding: '1rem', 
                background: 'var(--card-bg)', 
                borderRadius: '10px', 
                marginBottom: '1rem',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    style={{ cursor: 'pointer' }}
                  />
                  <span style={{ fontWeight: '500' }}>
                    {selectAll ? t('admin.staff.selectAll.deselectAll') : t('admin.staff.selectAll.selectAll')}
                  </span>
                </label>
                {selectedItems.size > 0 && (
                  <span style={{ color: 'var(--primary)', fontWeight: '500' }}>
                    {t('admin.staff.selectAll.selected', { count: selectedItems.size })}
                  </span>
                )}
              </div>
            )}
            <AnimatePresence>
              {filteredData.map((item, index) => (
                <Card
                  key={item.id}
                  className={activeTab === 'accounts' && hasPermission('manageStaff') ? 'selectable' : ''}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ 
                    border: selectedItems.has(item.id) ? '2px solid var(--primary)' : undefined,
                    background: selectedItems.has(item.id) ? 'rgba(224, 43, 32, 0.05)' : undefined
                  }}
                  onClick={(e) => {
                    // Ignore clicks on action buttons or inputs
                    if (e.target.closest('.action-btn') || e.target.tagName === 'INPUT') return;
                    if (activeTab === 'accounts' && hasPermission('manageStaff')) {
                      handleSelectItem(item.id);
                    }
                  }}
                >
                  <div className="card-header">
                    {activeTab === 'accounts' && hasPermission('manageStaff') && (
                      <div style={{ 
                        position: 'absolute', 
                        top: '1rem', 
                        left: '1rem', 
                        zIndex: 2,
                        background: 'var(--card-bg)',
                        borderRadius: '4px',
                        padding: '0.25rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}>
                        <input
                          type="checkbox"
                          checked={selectedItems.has(item.id)}
                          onChange={(e) => handleSelectItem(item.id)}
                          style={{ 
                            cursor: 'pointer',
                            transform: 'scale(1.2)',
                            accentColor: 'var(--primary)'
                          }}
                        />
                      </div>
                    )}
                    <div className="info">
                      {activeTab === 'accounts' ? (
                        <>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                            {/* User Avatar or Initial */}
                            <div style={{ flexShrink: 0 }}>
                              {item.profile?.avatarUrl ? (
                                <img 
                                  src={item.profile.avatarUrl} 
                                  alt={`${item.username} avatar`}
                                  style={{ 
                                    width: '45px', 
                                    height: '45px', 
                                    borderRadius: '50%', 
                                    objectFit: 'cover',
                                    border: '2px solid var(--primary)'
                                  }}
                                />
                              ) : (
                                <div style={{ 
                                  width: '45px', 
                                  height: '45px', 
                                  borderRadius: '50%', 
                                  background: item.isActive ? 'linear-gradient(135deg, var(--primary), var(--accent))' : '#9ca3af',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white',
                                  fontWeight: 'bold',
                                  fontSize: '1.1rem'
                                }}>
                                  {item.username.charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>
                            
                            {/* Account Info */}
                            <div style={{ flex: 1 }}>
                              <h3 style={{ margin: '0 0 0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {item.username}
                                {item.role === 'admin' && (
                                  <span style={{ 
                                    background: 'linear-gradient(135deg, #f59e0b, #d97706)', 
                                    color: 'white', 
                                    padding: '0.125rem 0.5rem', 
                                    borderRadius: '12px', 
                                    fontSize: '0.7rem',
                                    fontWeight: 'bold'
                                  }}>
                                    ADMIN
                                  </span>
                                )}
                              </h3>
                              <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                                {item.profile?.name_en || 'No profile'} • {item.profile?.department || 'No department'}
                              </div>
                            </div>
                          </div>
                          
                          <div className="meta">
                            <div className="meta-item">
                              <FiMail />
                              {item.email}
                            </div>
                            <div className="meta-item">
                              <FiKey />
                              Last login: {item.lastLogin ? new Date(item.lastLogin).toLocaleDateString() : 'Never'}
                            </div>
                            <div className={`status-badge ${item.isActive ? 'active' : 'inactive'}`}>
                              {item.isActive ? (
                                <>
                                  <FiToggleRight />
                                  Active
                                </>
                              ) : (
                                <>
                                  <FiToggleLeft />
                                  Inactive
                                </>
                              )}
                            </div>
                          </div>
                          
                          {/* Permissions Summary */}
                          <div style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>
                            <strong style={{ color: 'var(--text)' }}>Permissions:</strong>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.25rem' }}>
                              {item.canManageEvents && (
                                <span style={{ 
                                  background: 'rgba(59, 130, 246, 0.1)', 
                                  color: 'rgb(59, 130, 246)', 
                                  padding: '0.125rem 0.5rem', 
                                  borderRadius: '8px', 
                                  fontSize: '0.75rem',
                                  border: '1px solid rgba(59, 130, 246, 0.2)'
                                }}>
                                  {t('staff.profile.permissions.manageEvents')}
                                </span>
                              )}
                              {item.canReviewProfiles && (
                                <span style={{ 
                                  background: 'rgba(16, 185, 129, 0.1)', 
                                  color: 'rgb(16, 185, 129)', 
                                  padding: '0.125rem 0.5rem', 
                                  borderRadius: '8px', 
                                  fontSize: '0.75rem',
                                  border: '1px solid rgba(16, 185, 129, 0.2)'
                                }}>
                                  {t('staff.profile.permissions.reviewProfiles')}
                                </span>
                              )}
                              {item.canManageStaff && (
                                <span style={{ 
                                  background: 'rgba(245, 158, 11, 0.1)', 
                                  color: 'rgb(245, 158, 11)', 
                                  padding: '0.125rem 0.5rem', 
                                  borderRadius: '8px', 
                                  fontSize: '0.75rem',
                                  border: '1px solid rgba(245, 158, 11, 0.2)'
                                }}>
                                  {t('staff.profile.permissions.manageStaff')}
                                </span>
                              )}
                              {!item.canManageEvents && !item.canManageStaff && !item.canReviewProfiles && (
                                <span style={{ 
                                  background: 'var(--background-alt)', 
                                  color: 'var(--text-light)', 
                                  padding: '0.125rem 0.5rem', 
                                  borderRadius: '8px', 
                                  fontSize: '0.75rem',
                                  border: '1px solid var(--border)'
                                }}>
                                  {t('admin.staff.noPermissions')}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Account Stats */}
                          <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-light)', display: 'flex', gap: '1rem' }}>
                            <span><strong>Created:</strong> {new Date(item.createdAt).toLocaleDateString()}</span>
                            <span><strong>Profile Status:</strong> {item.profile?.status || 'No profile'}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                            {/* Avatar */}
                            <div style={{ flexShrink: 0 }}>
                              {item.avatarUrl ? (
                                <img 
                                  src={item.avatarUrl} 
                                  alt={`${item.name_en} avatar`}
                                  style={{ 
                                    width: '50px', 
                                    height: '50px', 
                                    borderRadius: '50%', 
                                    objectFit: 'cover',
                                    border: '2px solid var(--primary)',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                                  }}
                                />
                              ) : (
                                <div style={{ 
                                  width: '50px', 
                                  height: '50px', 
                                  borderRadius: '50%', 
                                  background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white',
                                  fontWeight: 'bold',
                                  fontSize: '1.2rem'
                                }}>
                                  {((item.name_en || item.staff?.username || 'U') + '').charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>
                            {/* Name and basic info */}
                            <div style={{ flex: 1 }}>
                              <h3 style={{ margin: '0 0 0.25rem 0' }}>{item.name_en || 'No Name'} / {item.name_zh || '无姓名'}</h3>
                            </div>
                          </div>
                          <div className="meta">
                            <div className="meta-item">
                              <FiUsers />
                              {item.staff?.username}
                            </div>
                            <div className="meta-item">
                              <FiMail />
                              {item.department}
                            </div>
                            <div className={`status-badge ${item.status || 'unknown'}`}>
                              {item.status === 'approved' && <FiCheck />}
                              {item.status === 'pending' && <FiClock />}
                              {item.status === 'rejected' && <FiX />}
                              {item.status ? (item.status + '').charAt(0).toUpperCase() + (item.status + '').slice(1) : 'Unknown'}
                            </div>
                          </div>
                          {/* Additional profile info preview */}
                          <div className="profile-preview" style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                            <div style={{ marginBottom: '0.25rem' }}>
                              <strong>Positions:</strong> {item.position_en || 'No Position'} / {item.position_zh || '无职位'}
                            </div>
                            {item.email && (
                              <div style={{ marginBottom: '0.25rem' }}>
                                <strong>Contact:</strong> {item.email}
                              </div>
                            )}
                            {(item.bio_en || item.bio_zh) && (
                              <div style={{ marginBottom: '0.25rem' }}>
                                <strong>Bio:</strong> {
                                  (() => {
                                    const bioText = item.bio_en && item.bio_zh 
                                      ? `${item.bio_en} / ${item.bio_zh}`
                                      : (item.bio_en || item.bio_zh || '');
                                    return bioText.substring(0, 150) + (bioText.length > 150 ? '...' : '');
                                  })()
                                }
                              </div>
                            )}
                            {item.reviewNote && (
                              <div style={{ marginBottom: '0.25rem' }}>
                                <strong style={{ color: '#8b5cf6' }}>Review Note: </strong> 
                                <span style={{ color: '#8b5cf6', fontStyle: 'italic' }}>
                                  {item.reviewNote.length > 80 ? `${item.reviewNote.substring(0, 80)}...` : item.reviewNote}
                                </span>
                              </div>
                            )}
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>
                              <strong>Last Updated:</strong> {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'Not available'}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="actions">
                      {activeTab === 'accounts' ? (
                        <>
                          <button 
                            className="action-btn edit"
                            onClick={() => handleEditStaff(item)}
                            title="Edit Account & Permissions"
                          >
                            <FiEdit />
                          </button>
                          <button 
                            className="action-btn secondary"
                            onClick={() => handleResetPassword(item)}
                            title="Reset Password"
                          >
                            <FiKey />
                          </button>
                          <button 
                            className="action-btn toggle"
                            onClick={() => handleToggleAccount(item)}
                            title={item.isActive ? "Deactivate Account" : "Activate Account"}
                          >
                            {item.isActive ? <FiToggleLeft /> : <FiToggleRight />}
                          </button>
                          <button 
                            className="action-btn delete"
                            onClick={() => handleDeleteStaff(item.id)}
                            title="Delete Staff"
                          >
                            <FiTrash2 />
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            className="action-btn view"
                            onClick={() => handleReviewProfile(item)}
                            title="Review Profile"
                          >
                            <FiEye />
                          </button>
                          {item.status === 'pending' && (
                            <>
                              <button 
                                className="action-btn approve"
                                onClick={() => handleQuickReview(item.id, 'approved')}
                                title="Approve"
                              >
                                <FiCheck />
                              </button>
                              <button 
                                className="action-btn reject"
                                onClick={() => handleQuickReview(item.id, 'rejected')}
                                title="Reject"
                              >
                                <FiX />
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </AnimatePresence>
          </div>
        )}

        <AnimatePresence>
          {showModal && (
            <Modal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              isReviewModal={modalType === 'review'}
            >
              <motion.div
                className="modal-content"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h3>
                    {modalType === 'create' && t('admin.staff.modal.create')}
                    {modalType === 'edit' && t('admin.staff.modal.edit')}
                    {modalType === 'review' && t('admin.staff.modal.review')}
                  </h3>
                  <button className="close-btn" onClick={() => setShowModal(false)}>
                    <FiX />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  {(modalType === 'create' || modalType === 'edit') && (
                    <>
                      <div className="form-group">
                        <label>{t('admin.staff.form.username')}</label>
                        <input
                          type="text"
                          value={formData.username}
                          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>{t('admin.staff.form.email')}</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                      
                      {modalType === 'create' && (
                        <div className="form-group">
                          <label>{t('admin.staff.form.password')}</label>
                          <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            required
                          />
                        </div>
                      )}
                      
                      <div className="form-group">
                        <label>{t('admin.staff.form.role')}</label>
                        <select
                          value={formData.role}
                          onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                        >
                          <option value="staff">{t('admin.staff.form.roles.staff')}</option>
                          <option value="admin">{t('admin.staff.form.roles.admin')}</option>
                        </select>
                      </div>
                      
                      <div className="form-group checkbox-group">
                        <label>
                          <input
                            type="checkbox"
                            checked={formData.isActive}
                            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                          />
                          {t('admin.staff.form.active')}
                        </label>
                      </div>
                      
                      {/* Permissions Section */}
                      <div className="permissions-section" style={{ 
                        marginTop: '1.5rem', 
                        padding: '1rem', 
                        background: 'var(--background-alt)', 
                        borderRadius: '10px',
                        border: '1px solid var(--border)'
                      }}>
                        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>Permissions</h4>
                        
                        <div className="form-group checkbox-group">
                          <label>
                            <input
                              type="checkbox"
                              checked={formData.canManageEvents || false}
                              onChange={(e) => setFormData(prev => ({ ...prev, canManageEvents: e.target.checked }))}
                            />
                            <strong>{t('staff.profile.permissions.manageEvents')}</strong> - {t('staff.profile.permissions.manageEventsDesc')}
                          </label>
                        </div>
                        
                        <div className="form-group checkbox-group">
                          <label>
                            <input
                              type="checkbox"
                              checked={formData.canReviewProfiles || false}
                              onChange={(e) => setFormData(prev => ({ ...prev, canReviewProfiles: e.target.checked }))}
                            />
                            <strong>{t('staff.profile.permissions.reviewProfiles')}</strong> - {t('staff.profile.permissions.reviewProfilesDesc')}
                          </label>
                        </div>
                        
                        <div className="form-group checkbox-group">
                          <label>
                            <input
                              type="checkbox"
                              checked={formData.canManageStaff || false}
                              onChange={(e) => setFormData(prev => ({ ...prev, canManageStaff: e.target.checked }))}
                            />
                            <strong>{t('staff.profile.permissions.manageStaff')}</strong> - {t('staff.profile.permissions.manageStaffDesc')}
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                  {modalType === 'review' && selectedItem && (
                    <>
                      {/* Profile Information Display */}
                      <div className="profile-review-section">
                        <h4 style={{ marginBottom: '1rem', color: 'var(--primary)', borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem' }}>
                          Profile Information
                        </h4>
                        
                        {/* Avatar */}
                        {selectedItem.avatarUrl && (
                          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <img 
                              src={selectedItem.avatarUrl} 
                              alt="Profile Avatar"
                              style={{ 
                                width: '100px', 
                                height: '100px', 
                                borderRadius: '50%', 
                                objectFit: 'cover',
                                border: '3px solid var(--primary)'
                              }}
                            />
                          </div>
                        )}
                        
                        {/* Basic Information */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                          <div className="info-item">
                            <strong>English Name:</strong>
                            <div style={{ padding: '0.5rem', background: 'var(--background-alt)', borderRadius: '5px', marginTop: '0.25rem' }}>
                              {selectedItem.name_en || 'Not provided'}
                            </div>
                          </div>
                          <div className="info-item">
                            <strong>Chinese Name:</strong>
                            <div style={{ padding: '0.5rem', background: 'var(--background-alt)', borderRadius: '5px', marginTop: '0.25rem' }}>
                              {selectedItem.name_zh || 'Not provided'}
                            </div>
                          </div>
                          <div className="info-item">
                            <strong>English Position:</strong>
                            <div style={{ padding: '0.5rem', background: 'var(--background-alt)', borderRadius: '5px', marginTop: '0.25rem' }}>
                              {selectedItem.position_en || 'Not provided'}
                            </div>
                          </div>
                          <div className="info-item">
                            <strong>Chinese Position:</strong>
                            <div style={{ padding: '0.5rem', background: 'var(--background-alt)', borderRadius: '5px', marginTop: '0.25rem' }}>
                              {selectedItem.position_zh || 'Not provided'}
                            </div>
                          </div>
                          <div className="info-item">
                            <strong>Department:</strong>
                            <div style={{ padding: '0.5rem', background: 'var(--background-alt)', borderRadius: '5px', marginTop: '0.25rem' }}>
                              {selectedItem.department || 'Not provided'}
                            </div>
                          </div>
                          <div className="info-item">
                            <strong>Username:</strong>
                            <div style={{ padding: '0.5rem', background: 'var(--background-alt)', borderRadius: '5px', marginTop: '0.25rem' }}>
                              {selectedItem.staff?.username || 'Not available'}
                            </div>
                          </div>
                        </div>
                        
                        {/* Contact Information */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                          <div className="info-item">
                            <strong>Email:</strong>
                            <div style={{ padding: '0.5rem', background: 'var(--background-alt)', borderRadius: '5px', marginTop: '0.25rem' }}>
                              {selectedItem.email || 'Not provided'}
                            </div>
                          </div>
                          <div className="info-item">
                            <strong>Phone:</strong>
                            <div style={{ padding: '0.5rem', background: 'var(--background-alt)', borderRadius: '5px', marginTop: '0.25rem' }}>
                              {selectedItem.phone || 'Not provided'}
                            </div>
                          </div>
                          <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                            <strong>LinkedIn:</strong>
                            <div style={{ padding: '0.5rem', background: 'var(--background-alt)', borderRadius: '5px', marginTop: '0.25rem' }}>
                              {selectedItem.linkedin ? (
                                <a href={selectedItem.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
                                  {selectedItem.linkedin}
                                </a>
                              ) : 'Not provided'}
                            </div>
                          </div>
                        </div>
                        
                        {/* Bio Information */}
                        <div style={{ marginBottom: '1.5rem' }}>
                          <div className="info-item" style={{ marginBottom: '1rem' }}>
                            <strong>English Bio:</strong>
                            <div style={{ padding: '0.75rem', background: 'var(--background-alt)', borderRadius: '5px', marginTop: '0.25rem', minHeight: '60px', whiteSpace: 'pre-wrap' }}>
                              {selectedItem.bio_en || 'Not provided'}
                            </div>
                          </div>
                          <div className="info-item">
                            <strong>Chinese Bio:</strong>
                            <div style={{ padding: '0.75rem', background: 'var(--background-alt)', borderRadius: '5px', marginTop: '0.25rem', minHeight: '60px', whiteSpace: 'pre-wrap' }}>
                              {selectedItem.bio_zh || 'Not provided'}
                            </div>
                          </div>
                        </div>
                        
                        {/* Timestamps */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                          <div>
                            <strong>Created:</strong> {selectedItem.createdAt ? new Date(selectedItem.createdAt).toLocaleString() : 'Not available'}
                          </div>
                          <div>
                            <strong>Updated:</strong> {selectedItem.updatedAt ? new Date(selectedItem.updatedAt).toLocaleString() : 'Not available'}
                          </div>
                        </div>
                      </div>
                      
                      {/* Review Controls */}
                      <div className="review-controls-section" style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                        <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>
                          Review Actions
                        </h4>
                        
                        <div className="form-group">
                          <label>{t('admin.staff.form.status')}</label>
                          <select
                            value={formData.status}
                            onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                          >
                            <option value="pending">{t('admin.staff.form.statuses.pending')}</option>
                            <option value="approved">{t('admin.staff.form.statuses.approved')}</option>
                            <option value="rejected">{t('admin.staff.form.statuses.rejected')}</option>
                          </select>
                        </div>
                        
                        {formData.status === 'approved' && (
                          <div className="form-group">
                            <label>{t('admin.staff.form.displayOrder')}</label>
                            <input
                              type="number"
                              value={formData.displayOrder}
                              onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: parseInt(e.target.value) || 0 }))}
                              min="0"
                            />
                          </div>
                        )}
                        
                        <div className="form-group">
                          <label>{t('admin.staff.form.reviewNote')}</label>
                          <textarea
                            value={formData.reviewNote}
                            onChange={(e) => setFormData(prev => ({ ...prev, reviewNote: e.target.value }))}
                            placeholder={t('admin.staff.form.reviewNotePlaceholder')}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="form-actions">
                    <button type="button" className="btn secondary" onClick={() => setShowModal(false)}>
                      {t('admin.staff.form.buttons.cancel')}
                    </button>
                    <button type="submit" className="btn primary">
                      {modalType === 'create' && t('admin.staff.form.buttons.create')}
                      {modalType === 'edit' && t('admin.staff.form.buttons.update')}
                      {modalType === 'review' && t('admin.staff.form.buttons.save')}
                    </button>
                  </div>
                </form>
              </motion.div>
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </StyledStaffAdmin>
  );
};

export default StaffAdmin; 