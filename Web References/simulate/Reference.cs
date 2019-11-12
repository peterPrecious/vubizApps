﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

// 
// This source code was auto-generated by Microsoft.VSDesigner, Version 4.0.30319.42000.
// 
#pragma warning disable 1591

namespace vubiz.apps.simulate {
    using System;
    using System.Web.Services;
    using System.Diagnostics;
    using System.Web.Services.Protocols;
    using System.Xml.Serialization;
    using System.ComponentModel;
    
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.2556.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Web.Services.WebServiceBindingAttribute(Name="ExchangeSoap", Namespace="http://vubiz.com/")]
    public partial class Exchange : System.Web.Services.Protocols.SoapHttpClientProtocol {
        
        private System.Threading.SendOrPostCallback GetAvailableProgramsOperationCompleted;
        
        private System.Threading.SendOrPostCallback GetLearnerProgramsOperationCompleted;
        
        private System.Threading.SendOrPostCallback GetCatalogOperationCompleted;
        
        private System.Threading.SendOrPostCallback GetProgramStatsOperationCompleted;
        
        private System.Threading.SendOrPostCallback GetLearnerCompletionOperationCompleted;
        
        private System.Threading.SendOrPostCallback PostSalesTransOperationCompleted;
        
        private System.Threading.SendOrPostCallback MemberXMLstatusOperationCompleted;
        
        private System.Threading.SendOrPostCallback MemberXMLhistoryOperationCompleted;
        
        private System.Threading.SendOrPostCallback MembersXMLhistoryOperationCompleted;
        
        private bool useDefaultCredentialsSetExplicitly;
        
        /// <remarks/>
        public Exchange() {
            this.Url = global::vubiz.apps.Properties.Settings.Default.vubiz_apps_simulate_Exchange;
            if ((this.IsLocalFileSystemWebService(this.Url) == true)) {
                this.UseDefaultCredentials = true;
                this.useDefaultCredentialsSetExplicitly = false;
            }
            else {
                this.useDefaultCredentialsSetExplicitly = true;
            }
        }
        
        public new string Url {
            get {
                return base.Url;
            }
            set {
                if ((((this.IsLocalFileSystemWebService(base.Url) == true) 
                            && (this.useDefaultCredentialsSetExplicitly == false)) 
                            && (this.IsLocalFileSystemWebService(value) == false))) {
                    base.UseDefaultCredentials = false;
                }
                base.Url = value;
            }
        }
        
        public new bool UseDefaultCredentials {
            get {
                return base.UseDefaultCredentials;
            }
            set {
                base.UseDefaultCredentials = value;
                this.useDefaultCredentialsSetExplicitly = true;
            }
        }
        
        /// <remarks/>
        public event GetAvailableProgramsCompletedEventHandler GetAvailableProgramsCompleted;
        
        /// <remarks/>
        public event GetLearnerProgramsCompletedEventHandler GetLearnerProgramsCompleted;
        
        /// <remarks/>
        public event GetCatalogCompletedEventHandler GetCatalogCompleted;
        
        /// <remarks/>
        public event GetProgramStatsCompletedEventHandler GetProgramStatsCompleted;
        
        /// <remarks/>
        public event GetLearnerCompletionCompletedEventHandler GetLearnerCompletionCompleted;
        
        /// <remarks/>
        public event PostSalesTransCompletedEventHandler PostSalesTransCompleted;
        
        /// <remarks/>
        public event MemberXMLstatusCompletedEventHandler MemberXMLstatusCompleted;
        
        /// <remarks/>
        public event MemberXMLhistoryCompletedEventHandler MemberXMLhistoryCompleted;
        
        /// <remarks/>
        public event MembersXMLhistoryCompletedEventHandler MembersXMLhistoryCompleted;
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://vubiz.com/GetAvailablePrograms", RequestNamespace="http://vubiz.com/", ResponseNamespace="http://vubiz.com/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public System.Xml.XmlNode GetAvailablePrograms(string CustomerID) {
            object[] results = this.Invoke("GetAvailablePrograms", new object[] {
                        CustomerID});
            return ((System.Xml.XmlNode)(results[0]));
        }
        
        /// <remarks/>
        public void GetAvailableProgramsAsync(string CustomerID) {
            this.GetAvailableProgramsAsync(CustomerID, null);
        }
        
        /// <remarks/>
        public void GetAvailableProgramsAsync(string CustomerID, object userState) {
            if ((this.GetAvailableProgramsOperationCompleted == null)) {
                this.GetAvailableProgramsOperationCompleted = new System.Threading.SendOrPostCallback(this.OnGetAvailableProgramsOperationCompleted);
            }
            this.InvokeAsync("GetAvailablePrograms", new object[] {
                        CustomerID}, this.GetAvailableProgramsOperationCompleted, userState);
        }
        
        private void OnGetAvailableProgramsOperationCompleted(object arg) {
            if ((this.GetAvailableProgramsCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.GetAvailableProgramsCompleted(this, new GetAvailableProgramsCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://vubiz.com/GetLearnerPrograms", RequestNamespace="http://vubiz.com/", ResponseNamespace="http://vubiz.com/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public System.Xml.XmlNode GetLearnerPrograms(string CustomerID, string LearnerID) {
            object[] results = this.Invoke("GetLearnerPrograms", new object[] {
                        CustomerID,
                        LearnerID});
            return ((System.Xml.XmlNode)(results[0]));
        }
        
        /// <remarks/>
        public void GetLearnerProgramsAsync(string CustomerID, string LearnerID) {
            this.GetLearnerProgramsAsync(CustomerID, LearnerID, null);
        }
        
        /// <remarks/>
        public void GetLearnerProgramsAsync(string CustomerID, string LearnerID, object userState) {
            if ((this.GetLearnerProgramsOperationCompleted == null)) {
                this.GetLearnerProgramsOperationCompleted = new System.Threading.SendOrPostCallback(this.OnGetLearnerProgramsOperationCompleted);
            }
            this.InvokeAsync("GetLearnerPrograms", new object[] {
                        CustomerID,
                        LearnerID}, this.GetLearnerProgramsOperationCompleted, userState);
        }
        
        private void OnGetLearnerProgramsOperationCompleted(object arg) {
            if ((this.GetLearnerProgramsCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.GetLearnerProgramsCompleted(this, new GetLearnerProgramsCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://vubiz.com/GetCatalog", RequestNamespace="http://vubiz.com/", ResponseNamespace="http://vubiz.com/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public System.Xml.XmlNode GetCatalog(string CustomerID) {
            object[] results = this.Invoke("GetCatalog", new object[] {
                        CustomerID});
            return ((System.Xml.XmlNode)(results[0]));
        }
        
        /// <remarks/>
        public void GetCatalogAsync(string CustomerID) {
            this.GetCatalogAsync(CustomerID, null);
        }
        
        /// <remarks/>
        public void GetCatalogAsync(string CustomerID, object userState) {
            if ((this.GetCatalogOperationCompleted == null)) {
                this.GetCatalogOperationCompleted = new System.Threading.SendOrPostCallback(this.OnGetCatalogOperationCompleted);
            }
            this.InvokeAsync("GetCatalog", new object[] {
                        CustomerID}, this.GetCatalogOperationCompleted, userState);
        }
        
        private void OnGetCatalogOperationCompleted(object arg) {
            if ((this.GetCatalogCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.GetCatalogCompleted(this, new GetCatalogCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://vubiz.com/GetProgramStats", RequestNamespace="http://vubiz.com/", ResponseNamespace="http://vubiz.com/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public System.Xml.XmlNode GetProgramStats(string CustomerID, string ProgramID, string ModuleID) {
            object[] results = this.Invoke("GetProgramStats", new object[] {
                        CustomerID,
                        ProgramID,
                        ModuleID});
            return ((System.Xml.XmlNode)(results[0]));
        }
        
        /// <remarks/>
        public void GetProgramStatsAsync(string CustomerID, string ProgramID, string ModuleID) {
            this.GetProgramStatsAsync(CustomerID, ProgramID, ModuleID, null);
        }
        
        /// <remarks/>
        public void GetProgramStatsAsync(string CustomerID, string ProgramID, string ModuleID, object userState) {
            if ((this.GetProgramStatsOperationCompleted == null)) {
                this.GetProgramStatsOperationCompleted = new System.Threading.SendOrPostCallback(this.OnGetProgramStatsOperationCompleted);
            }
            this.InvokeAsync("GetProgramStats", new object[] {
                        CustomerID,
                        ProgramID,
                        ModuleID}, this.GetProgramStatsOperationCompleted, userState);
        }
        
        private void OnGetProgramStatsOperationCompleted(object arg) {
            if ((this.GetProgramStatsCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.GetProgramStatsCompleted(this, new GetProgramStatsCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://vubiz.com/GetLearnerCompletion", RequestNamespace="http://vubiz.com/", ResponseNamespace="http://vubiz.com/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public System.Xml.XmlNode GetLearnerCompletion(int SessionID) {
            object[] results = this.Invoke("GetLearnerCompletion", new object[] {
                        SessionID});
            return ((System.Xml.XmlNode)(results[0]));
        }
        
        /// <remarks/>
        public void GetLearnerCompletionAsync(int SessionID) {
            this.GetLearnerCompletionAsync(SessionID, null);
        }
        
        /// <remarks/>
        public void GetLearnerCompletionAsync(int SessionID, object userState) {
            if ((this.GetLearnerCompletionOperationCompleted == null)) {
                this.GetLearnerCompletionOperationCompleted = new System.Threading.SendOrPostCallback(this.OnGetLearnerCompletionOperationCompleted);
            }
            this.InvokeAsync("GetLearnerCompletion", new object[] {
                        SessionID}, this.GetLearnerCompletionOperationCompleted, userState);
        }
        
        private void OnGetLearnerCompletionOperationCompleted(object arg) {
            if ((this.GetLearnerCompletionCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.GetLearnerCompletionCompleted(this, new GetLearnerCompletionCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://vubiz.com/PostSalesTrans", RequestNamespace="http://vubiz.com/", ResponseNamespace="http://vubiz.com/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public int PostSalesTrans(string SalesTransaction, bool Encrypted, out string AccountID, out string Password, [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)] out System.Nullable<System.DateTime> ExpiryDate, out string ResponseGUID) {
            object[] results = this.Invoke("PostSalesTrans", new object[] {
                        SalesTransaction,
                        Encrypted});
            AccountID = ((string)(results[1]));
            Password = ((string)(results[2]));
            ExpiryDate = ((System.Nullable<System.DateTime>)(results[3]));
            ResponseGUID = ((string)(results[4]));
            return ((int)(results[0]));
        }
        
        /// <remarks/>
        public void PostSalesTransAsync(string SalesTransaction, bool Encrypted) {
            this.PostSalesTransAsync(SalesTransaction, Encrypted, null);
        }
        
        /// <remarks/>
        public void PostSalesTransAsync(string SalesTransaction, bool Encrypted, object userState) {
            if ((this.PostSalesTransOperationCompleted == null)) {
                this.PostSalesTransOperationCompleted = new System.Threading.SendOrPostCallback(this.OnPostSalesTransOperationCompleted);
            }
            this.InvokeAsync("PostSalesTrans", new object[] {
                        SalesTransaction,
                        Encrypted}, this.PostSalesTransOperationCompleted, userState);
        }
        
        private void OnPostSalesTransOperationCompleted(object arg) {
            if ((this.PostSalesTransCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.PostSalesTransCompleted(this, new PostSalesTransCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://vubiz.com/MemberXMLstatus", RequestNamespace="http://vubiz.com/", ResponseNamespace="http://vubiz.com/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public System.Xml.XmlNode MemberXMLstatus(string CustomerGUID, string LearnerID) {
            object[] results = this.Invoke("MemberXMLstatus", new object[] {
                        CustomerGUID,
                        LearnerID});
            return ((System.Xml.XmlNode)(results[0]));
        }
        
        /// <remarks/>
        public void MemberXMLstatusAsync(string CustomerGUID, string LearnerID) {
            this.MemberXMLstatusAsync(CustomerGUID, LearnerID, null);
        }
        
        /// <remarks/>
        public void MemberXMLstatusAsync(string CustomerGUID, string LearnerID, object userState) {
            if ((this.MemberXMLstatusOperationCompleted == null)) {
                this.MemberXMLstatusOperationCompleted = new System.Threading.SendOrPostCallback(this.OnMemberXMLstatusOperationCompleted);
            }
            this.InvokeAsync("MemberXMLstatus", new object[] {
                        CustomerGUID,
                        LearnerID}, this.MemberXMLstatusOperationCompleted, userState);
        }
        
        private void OnMemberXMLstatusOperationCompleted(object arg) {
            if ((this.MemberXMLstatusCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.MemberXMLstatusCompleted(this, new MemberXMLstatusCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://vubiz.com/MemberXMLhistory", RequestNamespace="http://vubiz.com/", ResponseNamespace="http://vubiz.com/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public System.Xml.XmlNode MemberXMLhistory(string CustomerGUID, string LearnerID) {
            object[] results = this.Invoke("MemberXMLhistory", new object[] {
                        CustomerGUID,
                        LearnerID});
            return ((System.Xml.XmlNode)(results[0]));
        }
        
        /// <remarks/>
        public void MemberXMLhistoryAsync(string CustomerGUID, string LearnerID) {
            this.MemberXMLhistoryAsync(CustomerGUID, LearnerID, null);
        }
        
        /// <remarks/>
        public void MemberXMLhistoryAsync(string CustomerGUID, string LearnerID, object userState) {
            if ((this.MemberXMLhistoryOperationCompleted == null)) {
                this.MemberXMLhistoryOperationCompleted = new System.Threading.SendOrPostCallback(this.OnMemberXMLhistoryOperationCompleted);
            }
            this.InvokeAsync("MemberXMLhistory", new object[] {
                        CustomerGUID,
                        LearnerID}, this.MemberXMLhistoryOperationCompleted, userState);
        }
        
        private void OnMemberXMLhistoryOperationCompleted(object arg) {
            if ((this.MemberXMLhistoryCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.MemberXMLhistoryCompleted(this, new MemberXMLhistoryCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://vubiz.com/MembersXMLhistory", RequestNamespace="http://vubiz.com/", ResponseNamespace="http://vubiz.com/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public System.Xml.XmlNode MembersXMLhistory(string CustomerGUID, [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)] System.Nullable<System.DateTime> StartDate, [System.Xml.Serialization.XmlElementAttribute(IsNullable=true)] System.Nullable<System.DateTime> EndDate) {
            object[] results = this.Invoke("MembersXMLhistory", new object[] {
                        CustomerGUID,
                        StartDate,
                        EndDate});
            return ((System.Xml.XmlNode)(results[0]));
        }
        
        /// <remarks/>
        public void MembersXMLhistoryAsync(string CustomerGUID, System.Nullable<System.DateTime> StartDate, System.Nullable<System.DateTime> EndDate) {
            this.MembersXMLhistoryAsync(CustomerGUID, StartDate, EndDate, null);
        }
        
        /// <remarks/>
        public void MembersXMLhistoryAsync(string CustomerGUID, System.Nullable<System.DateTime> StartDate, System.Nullable<System.DateTime> EndDate, object userState) {
            if ((this.MembersXMLhistoryOperationCompleted == null)) {
                this.MembersXMLhistoryOperationCompleted = new System.Threading.SendOrPostCallback(this.OnMembersXMLhistoryOperationCompleted);
            }
            this.InvokeAsync("MembersXMLhistory", new object[] {
                        CustomerGUID,
                        StartDate,
                        EndDate}, this.MembersXMLhistoryOperationCompleted, userState);
        }
        
        private void OnMembersXMLhistoryOperationCompleted(object arg) {
            if ((this.MembersXMLhistoryCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.MembersXMLhistoryCompleted(this, new MembersXMLhistoryCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        public new void CancelAsync(object userState) {
            base.CancelAsync(userState);
        }
        
        private bool IsLocalFileSystemWebService(string url) {
            if (((url == null) 
                        || (url == string.Empty))) {
                return false;
            }
            System.Uri wsUri = new System.Uri(url);
            if (((wsUri.Port >= 1024) 
                        && (string.Compare(wsUri.Host, "localHost", System.StringComparison.OrdinalIgnoreCase) == 0))) {
                return true;
            }
            return false;
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.2556.0")]
    public delegate void GetAvailableProgramsCompletedEventHandler(object sender, GetAvailableProgramsCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.2556.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class GetAvailableProgramsCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal GetAvailableProgramsCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public System.Xml.XmlNode Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((System.Xml.XmlNode)(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.2556.0")]
    public delegate void GetLearnerProgramsCompletedEventHandler(object sender, GetLearnerProgramsCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.2556.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class GetLearnerProgramsCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal GetLearnerProgramsCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public System.Xml.XmlNode Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((System.Xml.XmlNode)(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.2556.0")]
    public delegate void GetCatalogCompletedEventHandler(object sender, GetCatalogCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.2556.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class GetCatalogCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal GetCatalogCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public System.Xml.XmlNode Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((System.Xml.XmlNode)(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.2556.0")]
    public delegate void GetProgramStatsCompletedEventHandler(object sender, GetProgramStatsCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.2556.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class GetProgramStatsCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal GetProgramStatsCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public System.Xml.XmlNode Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((System.Xml.XmlNode)(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.2556.0")]
    public delegate void GetLearnerCompletionCompletedEventHandler(object sender, GetLearnerCompletionCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.2556.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class GetLearnerCompletionCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal GetLearnerCompletionCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public System.Xml.XmlNode Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((System.Xml.XmlNode)(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.2556.0")]
    public delegate void PostSalesTransCompletedEventHandler(object sender, PostSalesTransCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.2556.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class PostSalesTransCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal PostSalesTransCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public int Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((int)(this.results[0]));
            }
        }
        
        /// <remarks/>
        public string AccountID {
            get {
                this.RaiseExceptionIfNecessary();
                return ((string)(this.results[1]));
            }
        }
        
        /// <remarks/>
        public string Password {
            get {
                this.RaiseExceptionIfNecessary();
                return ((string)(this.results[2]));
            }
        }
        
        /// <remarks/>
        public System.Nullable<System.DateTime> ExpiryDate {
            get {
                this.RaiseExceptionIfNecessary();
                return ((System.Nullable<System.DateTime>)(this.results[3]));
            }
        }
        
        /// <remarks/>
        public string ResponseGUID {
            get {
                this.RaiseExceptionIfNecessary();
                return ((string)(this.results[4]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.2556.0")]
    public delegate void MemberXMLstatusCompletedEventHandler(object sender, MemberXMLstatusCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.2556.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class MemberXMLstatusCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal MemberXMLstatusCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public System.Xml.XmlNode Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((System.Xml.XmlNode)(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.2556.0")]
    public delegate void MemberXMLhistoryCompletedEventHandler(object sender, MemberXMLhistoryCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.2556.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class MemberXMLhistoryCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal MemberXMLhistoryCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public System.Xml.XmlNode Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((System.Xml.XmlNode)(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.2556.0")]
    public delegate void MembersXMLhistoryCompletedEventHandler(object sender, MembersXMLhistoryCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.7.2556.0")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class MembersXMLhistoryCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal MembersXMLhistoryCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public System.Xml.XmlNode Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((System.Xml.XmlNode)(this.results[0]));
            }
        }
    }
}

#pragma warning restore 1591