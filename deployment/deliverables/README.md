## Questions


1. Imagine that your application will need to run two always-on `f1.2xlarge` instances (which come with instance storage and won't require any EBS volumes). To meet seasonal demand, you can expect to require as many as four more instances for a total of 100 hours through the course of a single year. What combination of instance types should you use? Calculate your total estimated monthly and annual costs.  
Cost Analysis :

1-Year Reserved Instance effective hourly rate: $1.06
2 f1.2xlarge instances running 24/7 for a year, Hours per year \= 8760 hours
Cost for always-on instances=2×8760×1.06=18,561.60 USD/year

On-Demand price per hour: $1.65
Total hours \= 400 hours (4 instances × 100 hours)
Cost for seasonal instances=400×1.65=660 USD/year

Total Annual Cost=18,561.60+660=19,221.60 USD/year

Monthly Cost=1219,221.60​=1,601.80 USD/month

2. What are some benefits to using an Elastic Load Balancer and an Auto Scaling Group? What are some cons?  
   Benefits of using an Elastic Load Balancer:

   High Availability and Fault Tolerance : ELB distributes incoming traffic across multiple targets, such as EC2 instances, in one or more Availability Zones. This enhances the reliability and resilience of your applications.

   Scalability :  The system can automatically scale EC2 instances up or down based on demand, maintaining consistent performance during traffic spikes or lulls.

   Improved Performance : By distributing workload across multiple computing resources, load balancers help maintain performance under high-traffic situations. This can lead to faster response times and better overall user experience.

   Health Monitoring : ELB performs regular health checks on targets, routing traffic only to healthy instances. This helps prevent potential downtime and ensures users are always directed to functioning resources.

   Security : ELB can handle SSL/TLS termination, offloading the work of encryption and decryption from your application servers. This allows your compute resources to focus on their primary tasks.

   Cost Optimization : By using Auto Scaling to adjust capacity based on actual demand, you can optimise costs by avoiding over-provisioning of resources during low-traffic periods.

   Cons : 

   Complexity : Implementing and managing ELB and Auto Scaling groups adds complexity to your infrastructure. 

   Potential Latency : In some cases, adding a load balancer to your architecture might introduce a small amount of latency.

   Cost Considerations : While Auto Scaling can help optimise costs, the use of ELB does come with its own charges. For small-scale applications or those with very consistent, low traffic, the added cost might not always be justified.

   Session Management Challenges : When using multiple instances behind a load balancer, maintaining user sessions can become more complex. 

   Configuration Overhead : Setting up proper health checks, scaling policies, and load balancer rules requires careful planning and ongoing management to ensure optimal performance.

   Potential for Over-scaling : If Auto Scaling policies are not carefully configured, there's a risk of scaling up unnecessarily in response to short-term spikes, potentially leading to higher costs.
   

3. What's the difference between a launch template and a launch configuration?  
Compatibility:
    Launch Configuration: Works only with Auto Scaling Groups.
    Launch Template: Compatible with Auto Scaling Groups (ASGs), managed EKS node groups, and can also be used to launch single EC2 instances.

Version Control:
    Launch Configuration: Does not support versioning. It is immutable and cannot be modified after creation.
    Launch Template: Supports versioning, allowing updates while maintaining previous versions.

Cost Management and Savings:
    Launch Configuration: Does not support mixed instance types or Spot instances. You can only choose either On-Demand or Spot instances, but not a mix of both.
    Launch Template: Supports mixed instance policies, allowing you to combine Spot and On-Demand instances within a single Auto Scaling Group.

Support for Latest AWS Features:
    Launch Configuration: Limited access. While AWS still supports Launch Configurations, they are considered legacy.
    Launch Template: AWS's recommended option going forward, meaning they receive updates with new features and enhancements regularly.
    
Use Cases:
    Launch Configuration: Suitable for simpler, legacy systems or environments where only basic configuration is required.
    Launch Template: Best for users needing advanced functionality, versioning, cost optimization, and flexibility in managing multiple instance types for Auto Scaling Groups.
 

4. What's the purpose of a security group?  
   A Security Group in AWS serves as a virtual firewall that controls inbound and outbound traffic to AWS resources, particularly Amazon EC2 instances. It provides a way to define rules that determine what kind of traffic is allowed to enter or leave an instance based on IP addresses, protocols, and port numbers. Security groups are a fundamental part of AWS's security model, helping to protect your instances and other resources from unauthorised access.

5. What's the method to convert an existing unencrypted EBS volume to an encrypted EBS volume? (optional)

   Steps to convert unencrypted EBS volume to an encrypted EBS volume :   
* Create a snapshot of the unencrypted volume.  
* Copy the snapshot with encryption enabled.  
* Create a new encrypted volume from the new encrypted snapshot.  
* Attach thße new encrypted volume to an instance.  
* Start your instance, and your volume is now encrypted.