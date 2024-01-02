//
//  LNExtensionExecutorUIController.swift
//  RNshare
//
//  Created by trimulabs on 1/1/24.
//


import Foundation
import UIKit
import LNExtensionExecutor
import SwiftUI

class ShareExtensionExecutor: ObservableObject {
    @MainActor
    func execute(extensionBundleIdentifier: String, shareItems: [Any], from presentingController: UIViewController) async throws {
        let executor = try LNExtensionExecutor(extensionBundleIdentifier: extensionBundleIdentifier)
        let (completed, returnItems) = try await executor.execute(withActivityItems: shareItems, on: presentingController)
        print("completed: \(completed) return items: \(returnItems)")
    }
}
  
class LNExtensionExecutorUIController : NSObject {
  
  private var shareExecutor = ShareExtensionExecutor()
  private var isLoading = false // Track loading state
  
  func shareWithInstagram(link: String) {
    if let rootController = UIApplication.shared.rootViewController {
      
      Task { @MainActor in
        do {
          let shareItems: [Any] = [URL(string: link)!, "Check out this website!"]
          try await shareExecutor.execute(extensionBundleIdentifier: "com.burbn.instagram.shareextension", shareItems: shareItems, from: rootController)
        } catch {
          print(error.localizedDescription)
        }
      }
    }
  }
  
  
  func shareWithSnapchat(link: String) {
    
    if let rootController = UIApplication.shared.rootViewController {
      Task { @MainActor in
        do {
          let shareItems: [Any] = [URL(string: link)!, "Check out this website!"]
          try await shareExecutor.execute(extensionBundleIdentifier: "com.toyopagroup.picaboo.share", shareItems: shareItems, from: rootController)
        } catch {
          print(error.localizedDescription)
        }
      }
    }
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}

// An extension to obtain the root UIViewController
extension UIApplication {
  var rootViewController: UIViewController? {
    connectedScenes
      .flatMap { ($0 as? UIWindowScene)?.windows ?? [] }
      .first(where: \.isKeyWindow)?.rootViewController
  }
}
